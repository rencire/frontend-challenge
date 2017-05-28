import React from 'react';
import Styles from './top_sales.scss';



// export default TopSalesList;
//write top sales list component here

class TopSalesList extends React.Component  {
    render() {
        return <pre><code>{JSON.stringify(this.props.orders, null, 4)}</code></pre>
    }
};

export default TopSalesList;
