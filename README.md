# HotSchedules Front-end Engineering Challenge

## Narrative 

After realizing the user experience of their application suite is disjointed, shadowy upper-management figures
have bestowed the task of unifying them to you! You have decided there can only be one solution: you must build
a component library! The complexity grows as you ponder the problem; the Russian team uses Angular.js for their app,
the Columbian team uses React.js for theirs, and the hipster dev team in SF decided to use nothing but jQuery. How will
you form a comprimise to pacify all the share holders??? 

## Task

Though the execs want to see a full fledged library completed by end of quarter, they really just need to get one
component released to production for all the apps ASAP to apease a large customer. Typical. The component in question is 
list which displays a customer's top selling items. Your job will be to create the component and implement it in the 
Angular app ('./angular-app'), the React app ('./react-app') and the jQuery app ('./jquery-app).

Your product manager provides you with the requirements:

1. Display the top 10 selling products in order from most sold to last. 
2. Display the revenue of each product.

Your star designer provides you with awesome mocks:

[Mocks](https://drive.google.com/file/d/0B7KmJIsOVjr6YTcwMC11bTBnVGs/view?usp=sharing)

(Don't stress on being pixel perfect.)

Your backend team exposes an api:

* The route '/PurchaseOrders' returns the latest PurchaseOrders
* Each PurchaseOrder has an array of products PurchaseOrder.products
* each Product has an order_count and vendor_price property which can be used to calculate revenue

## Getting Started 

Clone this repo.

`git clone x`

Install. Set up npm if needed (http://blog.teamtreehouse.com/install-node-js-npm-mac).

`npm install`

Install global packages

`npm install webpack -g`
`npm install json-server -g`

Start your mock server

`json-server --watch ./data/db.json`

In separate terminal window use webpack to build your app.  

Webpack is a module bundler that bundles all your code into one file and compiles it
from Javascript ES6 to Javascript ES5.

`npm run build-library`

In yet another window use webpack to build the react app.

`npm run build-react-app`

The builds will re-run everytime you update your source.  

Write the TopSalesList component in 'src/top-sales-list'.

You can write a utility function to help transform the data from the server to a format more
conducive to your component if needed in 'src/utils/'.

Implement the component so that it displays on the page with the relevant data in each of the 
three applications.

*hint* Use a library called ngReact to help with implementation in the Angular app.



