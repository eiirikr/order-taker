import React, {useState}from 'react';
import axios from 'axios';

const placeHolderImage = 'https://png.pngtree.com/element_our/20200702/ourmid/pngtree-red-shopping-cart-icon-png-free-image_2284820.jpg'

export default function WaitinglistDisplay(props) {

  const stock = props.productStocks[props.productList.productId]
  const waitlistId = props.productList._id
  const quantity = props.productList.quantity

  const addToCart = (waitlistId, quantity, products) => {
    axios.post(`${process.env.REACT_APP_BASE_URL}/waitlist/addToCart`, {
      waitlistId, quantity
    }).then((response) => {
        if(response.status === 200){
          props.Refresh()
          alert('Item successfully added to cart!')
        }
        else {
          alert(`Error ${response.status}, ${response.data.message}`) 
        }
      })
  };

  return (
    <div className='cart-card'>
      <div className='card'>
        <div className='image-container'>
            <img src={placeHolderImage} />
        </div>
      </div>

      <div className='cart-detail-container'>
        <div>
          <p className='thin-line'>name : {props.productList.name}</p>
          <p className='thin-line'>description : {props.productList.description}</p>
          <p className='thin-line'>price : {props.productList.price}</p>
          <p className='thin-line'>order quantity : {props.productList.quantity}</p>
          <p className='thin-line'>current stock : {stock}</p>
        </div>
      </div>

      <div className='add-to-cart-container'>
        <button 
          onClick={() => addToCart(props.productList._id, props.productList.quantity, props.productList)} 
          disabled={props.productList.quantity > stock}
        > Add to cart </button>
      </div>
    </div>
  )
}
