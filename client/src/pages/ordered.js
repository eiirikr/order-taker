import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

import OrderedDisplay from '../components/Page/orderedDisplay'
const getURL = `${process.env.REACT_APP_BASE_URL}/orderedProducts/`

export default function Ordered(){
  const [data, setData] = useState([]);

  const getData = async () => {
    const { data } = await axios.get(getURL);
    setData(data);
  };

  useEffect(() => {
    const socket = io(process.env.REACT_APP_BASE_URL);
    getData();

    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('newProduct', (newProduct) => {
      console.log('Received new product:', newProduct);
      setData((prevProducts) => [...prevProducts, newProduct]);
    });

    socket.on('updatedProduct', (updatedProduct) => {
      console.log('Received updated product:', updatedProduct);
      setData((prevProducts) => {
        const updatedProducts = prevProducts.map((product) => {
          if (product._id === updatedProduct._id) {
            return updatedProduct;
          }
          return product;
        });
        return updatedProducts;
      });
    });
    
    socket.on('deleteProduct', (deletedProduct) => {
      console.log('Product deleted:', deletedProduct);
      setData((prevProducts) => prevProducts.filter((product) => product._id !== deletedProduct._id));
    });
  
    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    }); 

    return () => {
      socket.disconnect();
    };
  }, []);

  var listOfOrders = []

  for (let i = 0; i<data.length; i++){
    for (let j = 0; j<data[i].products.length; j++){
      listOfOrders.push(data[i].products[j])
    }
  }

  var orderedList = listOfOrders.map(function(data){
    return <OrderedDisplay Product={data}/>;
  })

  if (data.length > 0) {
    return (
      <div className='content'>
        {orderedList}
      </div>
    );
  }

  return (
    <div className='content'>
      <div className='custom-absolute-center'>
        <h1> ¯\_(ツ)_/¯ </h1>
        <p> Sorry no ordered product</p>
      </div>
    </div>
  );
};
