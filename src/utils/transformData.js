//feel free to use lodash; it provides alot of type methods that are native to other languages
import {flatten, mergeWith} from 'lodash'

function pipe(data, ...fns) {
   return fns.reduce((res, fn) => {
        return fn(res)
   }, data)
}

// NOTE:
// - Not going to deal with formatting `product.name` for now.  Leave stub function here for future.
// https://stackoverflow.com/questions/4878756/how-to-capitalize-first-letter-of-each-word-like-a-2-word-city
function toTitleCase(str){
   return str
}


function extractProducts(data) {
    return data.map((order) => {
        return order.products
    }).reduce( (products, prod) => {
        return products.concat(prod)
    });
}

// Consolidates products into a hash, and merges product 'counts'.
//
// NOTE: we are using `product.name` as primary key, since it seems `product.product_id` is not unique...
function hashProducts(products) {

   return products.reduce((hash, prod) => {
       if (!hash.hasOwnProperty(prod.name)) {
           hash[prod.name] = [prod]
       } else {
           hash[prod.name].push(prod)
       }
      return hash
   }, {})
}

function mergeOrderCounts(productsHash) {

   function customizer(objVal, srcVal, key) {
      if (key === `order_count` && typeof srcVal === 'number') {
         return srcVal + objVal
      }
   }

   Object.keys(productsHash).forEach( (key) => {
      productsHash[key] = mergeWith(...productsHash[key], customizer)
   })

   return productsHash
}

function getProductHashVal(productsHash) {
   return Object.keys(productsHash).map( (key) => productsHash[key])
}



function calcRevenue(products) {

   return products.map( (prod) => {
      const denomScale = Math.pow(10, prod.vendor_price.scale)
      const value = prod.order_count * (prod.vendor_price.value / denomScale )
 
      return {
         name: prod.name,
         revenue: value,
         currency: prod.vendor_price.code
      }
   })
}

function sortByGreatestRevenue(products) {
   return products.sort( (a,b) => {
      return b.revenue - a.revenue
   })
}

// NOTES: 
// - `toFixed` has some edge cases to watch out for:
//
//    (1000000000000000000000).toFixed(2)
//    => '1e+21'
//
//   Assume `prod.revenue` will strictly be less than 9999999999999999. 
//
//    (9999999999999999).toFixed(2)
//    => '10000000000000000.00'
//
//    (9999999999999998).toFixed(2)
//    => '9999999999999998.00'
//
//
// - `currencyMap` only handles USD for now.
//

function convertForDisplay(products) {
   const currencyMap = {
      'USD': '$'
   }

   return products.map( (prod, index) => {
      return {
         position: index + 1,
         name: toTitleCase(prod.name),
         revenue: `${currencyMap[prod.currency]}${prod.revenue.toFixed(2)}`,
      }
   })
}

export default function transformData(data) {
   return pipe(data,
      JSON.parse,
      extractProducts,
      hashProducts,
      mergeOrderCounts,
      getProductHashVal,
      calcRevenue,
      sortByGreatestRevenue,
      convertForDisplay
    );
};

