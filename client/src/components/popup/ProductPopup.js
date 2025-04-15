import React, { useState } from 'react';
import axios from 'axios';

const placeHolderImage = 'https://png.pngtree.com/element_our/20200702/ourmid/pngtree-red-shopping-cart-icon-png-free-image_2284820.jpg'

const ProductPopUp = (props) => {

  const postURL = `${process.env.REACT_APP_BASE_URL}/carts/addToCart`
  const [orderQuantity, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const addToCart = () => {
    if (orderQuantity <= 0) {
      alert('No items added')
      return
    }
    axios.post(postURL, {
      productId: props.productDetails.Product._id,
      quantity: orderQuantity
    })
    .then((response) => {
      if (response.status === 200){
        alert(`${response.data.message}`)
        props.toClose(false)
      }
      else {
        alert(`Error ${response.status}, ${response.data.message}`) 
      }
    });
  };

  return (
    <div className='card'>
      <div className='popup-card'>
        <div className='image-container custom-center'>
            <img src={placeHolderImage} />
        </div>

        <div className='product-pop-up-detail-container'>
          <h3>{props.productDetails.Product.name}</h3>
          <hr />
          <p>{props.productDetails.Product.description}</p>
          <p>Current Stock: {props.productDetails.Product.stock}</p>
          <div>
            <input className='input-box' type='number' min="0" value={orderQuantity} onChange={handleChange}/>
          </div>
        </div>

        <div className='button-container'>
          <button className='button' onClick={addToCart}>Add to cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductPopUp;