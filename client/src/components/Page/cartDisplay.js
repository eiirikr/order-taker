import React, { useEffect, useState } from 'react';
import axios from 'axios';

const placeHolderImage = 'https://png.pngtree.com/element_our/20200702/ourmid/pngtree-red-shopping-cart-icon-png-free-image_2284820.jpg'

export default function CartDisplay(props) {

  const getURL = `${process.env.REACT_APP_BASE_URL}/products/${props.Product.productId}`
  const deletetURL = `${process.env.REACT_APP_BASE_URL}/carts/deleteCartItem`
  const putURL = `${process.env.REACT_APP_BASE_URL}/carts/editCartItem`

  const [data, setData] = useState([]);
  var [orderQuantity, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const getData = async () => {
    const { data } = await axios.get(getURL);
    setData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const deleteCartItem = () => {
    axios.delete(deletetURL, {
      data : {productId: props.Product._id}
    })
    .then((response) => {
      if (response.status === 200){
        props.Refresh()
        alert(`${response.data.message}`)
      }
      else {
        alert(`Error ${response.status}, ${response.data.message}`) 
      }
        
    });
  };

  const editCartItem = () => {
    axios.put(putURL, {
      productId: props.Product._id,
      quantity: orderQuantity
    })
    .then((response) => {
      if (response.status === 200){
        alert(`${response.data.message}`)
      }
      else {
        alert(`Error ${response.status}, ${response.data.message}`) 
      }
    });
  }

  return (
    <div className='cart-card'>
      <div className='card'>
        <div className='image-container'>
            <img src={placeHolderImage} />
        </div>
      </div>

      <div className='cart-detail-container'>
        <div>
          <p>name : {props.Product.name}</p>
          <p>description : {props.Product.description}</p>
          <div>
            quantity : 
            <input type='number' 
              min="0"
              value={orderQuantity? orderQuantity : props.Product.quantity} 
              onChange={handleChange}/>
            <button onClick={editCartItem} 
              disabled={!orderQuantity || orderQuantity==props.Product.quantity}>Edit quantity</button>
          </div>
        </div>
      </div>

      <div className='cart-stock-container'>
        <button className='close-button custom-right-align'
          onClick={deleteCartItem}> x </button>
        <p className='custom-bottom-left-align'>Current Stock: {data.stock}</p>
      </div>
    </div>
  )
}
