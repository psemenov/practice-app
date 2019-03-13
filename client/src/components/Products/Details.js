import React from 'react';
import {ProductConsumer, ProductContext} from '../../productContext';
import ProductInfo from './ProductInfo';

export default function Details(props) {
	let {category, id} = props.match.params;
	return(
		<React.Fragment>
			<ProductConsumer>
        {(value) => {
					let tempProduct = value.getById(parseInt(id, 10));
					console.log(tempProduct);
          if(!(Object.keys(tempProduct).length === 0 && tempProduct.constructor === Object))
         	 	return <ProductInfo key={tempProduct.id} product={tempProduct} />
        }}
  		</ProductConsumer>
		</React.Fragment>
	);
}