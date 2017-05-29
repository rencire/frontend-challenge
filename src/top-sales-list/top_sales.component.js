import React, {createElement as h } from 'react'
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

const Product = (props) => {
    return (
        <li className={Styles.listItem}>
            <div className={Styles.circle}>
                {props.position}
            </div>
            <div className={Styles.productInfo}>
                <p className={Styles.productName}>
                    {props.name}
                </p>
                <p className={Styles.productRevenue}>
                    {props.revenue}
                </p>
            </div>
        </li>
    )
}


export default TopSalesList;
