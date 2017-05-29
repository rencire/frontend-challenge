import React from 'react'
import Product from './product.component.js'
import Styles from './top_sales.scss'

class TopSalesList extends React.Component  {
    render() {
        return (
            <div>
                <h1 className={Styles.title}>
                    Top Sales Items
                    <ul className={Styles.productList}>
                        {
                            this.props.products.map((prod) => {
                                 return <Product key={prod.name} {...prod}/>
                            })
                        }
                    </ul>
                </h1> 
            </div>
        )
    }
};


export default TopSalesList;
