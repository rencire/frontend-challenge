import React from 'react';
import ReactDOM from 'react-dom';
import TopSalesList from "../../dist/TopSalesList/index.js";
import transformData from "../../dist/Utils/transformData.js";
import request from 'request';

request.get('http://localhost:3000/PurchaseOrders', function (error, response, body) {
  console.log('body:', body); 

  const products = transformData(body);
  
  ReactDOM.render(<TopSalesList products={products}/>, document.getElementById('app'));
});


