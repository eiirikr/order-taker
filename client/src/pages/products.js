import React, { useEffect, useState } from 'react';
import axios from 'axios';

import ProductDisplay from '../components/Page/productDisplay'
const getURL = `${process.env.REACT_APP_BASE_URL}/products/`

export default function Product(){
  const [data, setData] = useState([]);

  const getData = async () => {
    const { data } = await axios.get(getURL);
    setData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  var productList = data.map(function(data){
    return <ProductDisplay Product={data}/>;
  })

  if (data.length > 0) {
    return (
      <div className='content'>
        {productList}
      </div>
    );
  }

  return (
    <div className='content'>
      <div className='custom-absolute-center'>
        <h1> ¯\_(ツ)_/¯ </h1>
        <p> Sorry no product listings</p>
      </div>
    </div>
  );
};
