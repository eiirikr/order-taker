import React, { useState, useEffect } from 'react';

function PopUpManage(props) {
  const [updatedNameValue, setUpdatedNameValue] = useState('');
  const [updatedDescriptionValue, setUpdatedDescriptionValue] = useState('');
  const [updatedPriceValue, setUpdatedPriceValue] = useState('');
  const [updatedStockValue, setUpdatedStockValue] = useState('');

  useEffect(() => {
    if (props.selectedProduct) {
      setUpdatedNameValue(props.selectedProduct.name);
      setUpdatedDescriptionValue(props.selectedProduct.description);
      setUpdatedPriceValue(props.selectedProduct.price);
      setUpdatedStockValue(props.selectedProduct.stock);
    }
  }, [props.selectedProduct]);

  const handleSaveProduct = () => {
    const updatedProduct = {
      ...props.selectedProduct,
      name: updatedNameValue,
      description: updatedDescriptionValue,
      price: updatedPriceValue,
      stock: updatedStockValue,
    };
    props.updateProduct(updatedProduct);
    props.setTrigger(false);
  };

  return props.trigger ? (
    <div className='popup'>
      <div className='popup-content'>
        <div className='popup-header'>
          <button className='close-button' onClick={() => props.setTrigger(false)}>x</button>
        </div>
        <div className='popup-items-container'>
          <h2>Edit Items</h2>
          <div className='item'>
            <p className='custom-absolute-center label'>Name</p>
            <input
              type='text'
              placeholder='Item name'
              className='item-input-align'
              value={updatedNameValue}
              onChange={(e) => setUpdatedNameValue(e.target.value)}
            />
          </div>
          
          <br/>
          <div className='item'>
            <p className='custom-absolute-center label'>Description</p>
            <input
              type='text'
              placeholder='Item description'
              className='item-input-align'
              value={updatedDescriptionValue}
              onChange={(e) => setUpdatedDescriptionValue(e.target.value)}
            />
          </div>
          
          <br/>
          <div className='item'>
          <p className='custom-absolute-center label'>Price</p>
            <input
              type='number'
              placeholder='Price'
              min="0"
              className='item-input-align'
              value={updatedPriceValue}
              onChange={(e) => setUpdatedPriceValue(e.target.value)}
            />
          </div>
          
          <br/>
          <div className='item'>
            <p className='custom-absolute-center label'>Stock</p>
            <input
              type='number'
              placeholder='Stock'
              min="0"
              className='item-input-align'
              value={updatedStockValue}
              onChange={(e) => setUpdatedStockValue(e.target.value)}
            />
          </div>

          <div className='item'>
            <button className='save-button' onClick={handleSaveProduct}>Save Product</button>
          </div>

        </div>
      </div>
    </div>
  ) : null;
}

export default PopUpManage;
