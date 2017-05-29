import React from 'react'
import Styles from './product.scss'

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

export default Product
