import React, {createElement as h } from 'react'
import Styles from './top_sales.scss'

class TopSalesList extends React.Component  {
    render() {
        return (
            h('div', null,
                h('h1', {className: Styles.title}, 'Top Sales Items'),
                h('ul', {className: Styles.productList},
                    this.props.products.map((prod) => {
                        return Product(prod)
                    })
                )
            )
        )
    }
};

const Product = (props) => {
    return (
        h('li', {key: props.name, className: Styles.listItem},
            h('div', {className: Styles.circle},
                props.position
            ),
            h('div', {className: Styles.productInfo},
                h('p', {className: Styles.productName},
                    props.name
                ),
                h('p', {className: Styles.productRevenue},
                    props.revenue
                )
            )
        )
    )
}


export default TopSalesList;
