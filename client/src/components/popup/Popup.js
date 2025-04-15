import React from 'react';
import ProductPopUp from './ProductPopup';

const Popup = ({ isOpen, onClose, props }) => {
  const pull_data = (data) =>{
    if(data == false){
      onClose()
    }
  }

  if (!isOpen) {
    return null; // If the popup is not open, render nothing
  }
  
  return (
    <div className='popup'>
      <div className='popup-content'>
        <div className='popup-header'>
          <button onClick={onClose} className='close-button'> x </button>
        </div>
        <ProductPopUp productDetails={props} toClose={pull_data}/>
      </div>
    </div>
  );
};

export default Popup;