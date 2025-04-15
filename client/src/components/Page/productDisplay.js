import React, { useState } from 'react';
import Popup from './../popup/Popup'

const placeHolderImage = 'https://png.pngtree.com/element_our/20200702/ourmid/pngtree-red-shopping-cart-icon-png-free-image_2284820.jpg'

export default function ProductDisplay(props) {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  return (
    <div className='card'>
      <div className='card'>
        <div className='image-container'>
            <img src={placeHolderImage} />
        </div>
        {props.Product.name}
        <div className='button-container'>
          <button className='button' onClick={handleOpenPopup}>View Product</button>
        </div>
      </div>

      <div>
        <Popup isOpen={isPopupOpen} onClose={handleClosePopup} props={props}/>
      </div>
    </div>
  )
}
