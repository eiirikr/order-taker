import React from 'react';

const placeHolderImage = 'https://png.pngtree.com/element_our/20200702/ourmid/pngtree-red-shopping-cart-icon-png-free-image_2284820.jpg'

export default function OrderedDisplay(props) {
  return (
    <div className='ordered-card'>
      <div className='card'>
        <div className='image-container'>
            <img src={placeHolderImage} />
        </div>
      </div>

      <div className='ordered-detail-container'>
        <div>
          <p>name : {props.Product.name}</p>
          <p>description : {props.Product.description}</p>
          <p>quantity : {props.Product.quantity}</p>
        </div>
      </div>
    </div>
  )
}
