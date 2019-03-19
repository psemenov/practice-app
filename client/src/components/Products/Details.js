import React from 'react';
import {MainConsumer, context} from '../../context';
import ProductInfo from './ProductInfo';

export default function Details(props) {
	let {category, id} = props.match.params;
	return(
		<React.Fragment>
			<MainConsumer>
        {(value) => {
					let tempProduct = value.getById(id);
					console.log(tempProduct);
          if(!(Object.keys(tempProduct).length === 0 && tempProduct.constructor === Object))
         	 	return <ProductInfo key={tempProduct.id} product={tempProduct} />
        }}
  		</MainConsumer>
		</React.Fragment>
	);
}