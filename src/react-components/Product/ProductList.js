import React from 'react';
import ProductItem from './ProductItem';

class ProductList extends React.Component {
  render() {
    return (
      <ul className="product-list">
        {/*<ProductItem
          id={this.props.productList[0].id}
          name={this.props.productList[0].name}
          link={this.props.productList[0].link}
          media={this.props.productList[0].media}
          upvote={this.props.productList[0].upvote}
          description={this.props.productList[0].description}
          maker={this.props.productList[0].maker}
          />*/}

        {
          this.props.productList.map( (item, idx) => <ProductItem key={idx} {...item}/> )
        }





      </ul>
    )
  }
}

export default ProductList
