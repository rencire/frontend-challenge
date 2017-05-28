//feel free to use lodash; it provides alot of type methods that are native to other languages
import {flatten, mergeWith} from 'lodash'

function pipe(data, ...fns) {
   return fns.reduce((res, fn) => {
        return fn(res)
   }, data)
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
      let denomScale = Math.pow(10, prod.vendor_price.scale)
      return {
         name: prod.name,
         revenue: prod.order_count * (prod.vendor_price.value / denomScale )
      }
   })
}

function sortByRevenue(products) {
   return products.sort( (a,b) => {
      return b.revenue - a.revenue
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
      sortByRevenue
    );
};

