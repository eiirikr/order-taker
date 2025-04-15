import React, { useEffect, useState } from 'react';
import axios from 'axios';

import CartDisplay from '../components/Page/cartDisplay'

const getURL = `${process.env.REACT_APP_BASE_URL}/carts/showCart`
const postURL = `${process.env.REACT_APP_BASE_URL}/orderedProducts/placeOrder/`

export default function Cart(){
  const [data, setData] = useState([]);

  var listOfCart = []
  var listOfCartId = []

  const placeOrder = () => {
    if (listOfCartId <= 0) {
      alert('No items in cart')
      return
    }

    for (let items in listOfCartId){
      axios.post(postURL + listOfCartId[items])
      .then((response) => {
        if (response.status !== 200){
          alert(`Error ${response.status}, ${response.data.message}`)
          return 
        }
        else if (response.status === 200){
          let ordered = []
          let waitlist = []
          let orderedMessage = ''
          let waitingMessage = ''
          
          for (let products in response.data.orderedProducts) {
            ordered.push(response.data.orderedProducts[products].name)
          }

          for (let products in response.data.waitingListProducts) {
            waitlist.push(response.data.waitingListProducts[products].name)
          }

          if(ordered.length > 0){
            orderedMessage = "Items successfully ordered:\n" + ordered.join("\n")
          }
          if(waitlist.length > 0){
            waitingMessage = "Items Added to waitlist:\n" + waitlist.join("\n")
          }

          alert(
            orderedMessage + "\n\n" + waitingMessage
          );

          getData()
        }
      });
    }
  };

  const getData = async () => {
    const { data } = await axios.get(getURL);
    setData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  for (let i = 0; i<data.length; i++){
    listOfCartId.push(data[i]._id)
    for (let j = 0; j<data[i].products.length; j++){
      listOfCart.push(data[i].products[j])
    }
  }

  var cartList = listOfCart.map(function(data){
    return <CartDisplay Product={data} Refresh={getData}/>;
  })

  if (data.length > 0) {
    if (data.length === 1 && data[0].products.length > 0){
      return (
        <div>
          <div className='content'>
            {cartList}
          </div>
          <div className='placeorder-button'>
              <button className='medium-button' 
                disabled={!listOfCartId}
                onClick={placeOrder}>Place order</button>
            </div>
        </div>
      );
    }
  }

  return (
    <div className='content'>
      <div className='custom-absolute-center'>
        <h1> ¯\_(ツ)_/¯ </h1>
        <p> Sorry no product added to cart</p>
      </div>
    </div>
  );
};