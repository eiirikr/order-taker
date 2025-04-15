import React, { useEffect , useState} from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import PopUpManage from '../components/popup/PopUpManage';

// const socket = io('http://localhost:4000');
const placeHolderImage = 'https://png.pngtree.com/element_our/20200702/ourmid/pngtree-red-shopping-cart-icon-png-free-image_2284820.jpg'

export default function ManageProduct(){

  const [products, setProducts] = useState([]);

  // Form inputs
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productStock, setProductStock] = useState("");

  // Popup
  const [buttonPopup, setButtonPopup] = useState(false);

  // Popup
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // Add product
  const AddProduct = () => {
    if (productName && productStock) {
      const newProduct = {
        name: productName,
        description: productDescription,
        price: parseInt(productPrice),
        stock: parseInt(productStock),
      };
  
      // Send the new item to the server using the HTTP POST route
      axios.post(`${process.env.REACT_APP_BASE_URL}/products/addProduct`, newProduct, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          setProducts([...products, response.data])
          setProductName('');
          setProductDescription('');
          setProductPrice('');
          setProductStock('');
          alert('New product added!');
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  // Delete product
  const deleteProduct = async(_id) => {
    // Delete the product
    console.log('Deleting product with _id:', _id);
    const res = await axios.delete(`${process.env.REACT_APP_BASE_URL}/products/deleteProduct/${_id}`);
    // Update the state
    // const newProducts = [...products].filter(products => products._id !== _id);
    // setProducts(newProducts)
    const newProducts = [...products].filter((product) => {
      return product._id !== _id;
    });
    setProducts(newProducts);
    alert('Product deleted!');
  }

  // Update value
  const updateProduct = (updatedProduct) => {
    // Extract the productId from the selectedProduct
    const productId = updatedProduct._id;
  
    // Send the updated product to the server using the HTTP PUT route
    axios.put(`${process.env.REACT_APP_BASE_URL}/products/updateproduct/${productId}`, updatedProduct, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        // Update the products state with the updated product
        const updatedProducts = products.map((product) => {
          if (product._id === productId) {
            return updatedProduct;
          }
          return product;
        });
        setProducts(updatedProducts);
        alert('Product updated');
      })
      .catch((error) => {
        console.error(error);
      });
  };
  

  useEffect(() => {
    const socket = io(process.env.REACT_APP_BASE_URL);

    axios.get(`${process.env.REACT_APP_BASE_URL}/products/`)
    .then((response) => {
      setProducts(response.data)
    })
    .catch((error) => {
      console.error(error);
    });

    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('newProduct', (newProduct) => {
      console.log('Received new product:', newProduct);
      setProducts((prevProducts) => [...prevProducts, newProduct]);
    });

    socket.on('updatedProduct', (updatedProduct) => {
      console.log('Received updated product:', updatedProduct);
      setProducts((prevProducts) => {
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
      setProducts((prevProducts) => prevProducts.filter((product) => product._id !== deletedProduct._id));
    });
  
    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    }); 

    return () => {
      socket.disconnect();
    };

  },[]);

  return (
    <div>
      <div>
        <div className='cart-card'>
          
          <div className='manage-detail-container'>
            <h2 className='add-item-header'>Add Items</h2>
            <input
              className='add-input'
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Item name"
            />
            <input
             className='add-input'
              type="text"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              placeholder="Item description"
            />
            <input
              className='add-input'
              type="number"
              min="0"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              placeholder="Price"
            />
            <input
              className='add-input'
              type="number"
              min="0"
              value={productStock}
              onChange={(e) => setProductStock(e.target.value)}
              placeholder="Stock"
            />
          </div>

          <div className='add-to-cart-container'>
            <button 
              className='custom-bottom-right-align medium-button'
              onClick={AddProduct}>
              Add Product
            </button>
          </div>
        </div>
      </div>
      <div>
        <h2 className='add-item-header'>List of Products</h2>
        <ul>
          {products.map((products) => (
            <li key={products._id}>
              <div className='cart-card'>
                <div className='card'>
                  <div className='image-container'>
                  <img src={placeHolderImage} />
                  </div>
                </div>

                <div className='waitlist-detail-container'>
                  <div className='waitlist-detail'>
                    <p>name : {products.name}</p>
                    <p>description : {products.description}</p>
                    <p>stock : {products.stock}</p>
                  </div>
                </div>

                <div className='add-to-cart-container'>
                <button 
                  className='custom-bottom-right-align medium-button'
                  onClick={() => {
                  setSelectedProduct(products);
                  setButtonPopup(true);
                  }}>
                  Edit
                </button>
                <button 
                  className='custom-bottom-right-align medium-button'
                  onClick={() => deleteProduct(products._id)}>
                  Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <PopUpManage 
          trigger={buttonPopup}
          setTrigger={setButtonPopup}
          selectedProduct={selectedProduct}
          updateProduct={updateProduct}
        />

      </div>

    </div>

    
  );
}