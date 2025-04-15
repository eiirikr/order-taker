import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import WaitinglistDisplay from '../components/Page/waitinglistDisplay'

const socket = io(process.env.REACT_APP_BASE_URL);

export default function ManageProduct() {
  const [waitProducts, setWaitProducts] = useState([]);
  const [productStocks, setProductStocks] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleAddToCart = (waitlistId, quantity, products) => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/waitlist/addToCart`, { waitlistId, quantity })
      .then(() => {
        fetchWaitListData();
        alert('Item successfully added to cart!')
      })
      .catch((error) => {
        console.error(error);
        setError('Failed to add product to cart.');
      });
  };

  const fetchWaitListData = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/waitlist/`)
      .then((response) => {
        setWaitProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError('Failed to fetch waitlist data.');
        setLoading(false);
      });
  };

  useEffect(() => {
    // const socket = io('http://localhost:4000');
    fetchWaitListData();
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/products/`)
      .then((response) => {
        const stocks = response.data.reduce((acc, product) => {
          acc[product._id] = product.stock;
          return acc;
        }, {});
        setProductStocks(stocks);
      })
      .catch((error) => {
        console.error(error);
      });

    socket.on('connect', () => {
      console.log('Connected to server waitinglist');
    });

    socket.on('updatedProduct', (updatedProduct) => {
      console.log('Received updated product in waitingListDisplay:', updatedProduct);
      setProductStocks((prevStocks) => {
        const updatedStocks = { ...prevStocks };
        updatedStocks[updatedProduct._id] = updatedProduct.stock;
        
        return updatedStocks;
      });
      alert('Stocks updated')
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    return () => {
      // Clean up the socket event listeners
      socket.off('connect');
      socket.off('updatedProduct');
      socket.off('disconnect');
    };
  }, []);


  if (error) {
    return (
      <div className='content'>
        <div className='custom-absolute-center'>
          <h1>Error occurred</h1>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  var waitList = waitProducts.map(function(data){
    return <WaitinglistDisplay 
      productList={data} 
      productStocks={productStocks}
      Refresh={fetchWaitListData}/>;
  })

  
  if (waitProducts.length > 0) {
    return (
      <div className='content'>
        {waitList}
      </div>
    );
  }

  return (
    <div className='content'>
      <div className='custom-absolute-center'>
        <h1> ¯\_(ツ)_/¯ </h1>
        <p> Sorry no product added to cart</p>
      </div>
    </div>
  );

  if (waitProducts.length === 0) {
    return (
      <div className='content'>
        <div className='custom-absolute-center'>
          <h1>No products added to the waitlist yet.</h1>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h1>Waiting List Products</h1>
        <ul>
          {waitProducts.map((product) => (
            <li key={product._id}>
              <div>
                <h3>{product.name}</h3>
                <h5>Description: {product.description}</h5>
                <h5>Price: {product.price}</h5>
                <h5>Order Quantity: {product.quantity}</h5>
                <h5>Current Stock: {productStocks[product.productId] !== undefined ? productStocks[product.productId] : 'N/A'}</h5>

                <button
                  disabled={productStocks[product.productId] < product.quantity}
                  onClick={() => handleAddToCart(product._id, product.quantity, product)}
                >
                  Add to Cart
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}