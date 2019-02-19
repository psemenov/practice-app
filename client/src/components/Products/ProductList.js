import React, { Component, useContext} from 'react';
import Product from './Product';
import Filter from './Filter';
import styled from 'styled-components';
import {ProductConsumer, ProductContext} from '../../productContext';
import { Redirect } from 'react-router-dom';
import Default from '../Default';

export default function ProductList(props) {
	//get params
	let {category, type} = props.match.params;
	if(!type) type = "none";
	//not match
	// const isProductPathActive = !!matchPath(
 //    this.props.location.pathname, 
 //    '/products/' + category + (type !== "none" ? '/' + type : "")
 //  ); 
	const contextValue = useContext(ProductContext);
	const title = contextValue.getTitle(category, type);
	console.log(title);
	return (
		<React.Fragment>
			{title === "unknown" ? <Default /> : 
			<div className="container-fluid">
				<div className="row p-3">
					<h2 className="text-center w-100">{title}</h2>
				</div>
				<div className="row mt-2">
					<Filter />
					<div className="col-xl-10 col-lg-9 col-md-8 list">
						<ListWrapper>
							<div className="col">
								<div className="row">
									<ProductConsumer>
		                {(value) => {
											let tempProducts = value.getByCategoryAndType(category, type);
		                  if(tempProducts.length > 0)
		                  return tempProducts.map(product => {
		                    return <Product key={product.id} product={product} />
		                  })
		                }}
	            		</ProductConsumer>
								</div>
							</div>
						</ListWrapper>
					</div>			
				</div>
			</div>}
		</React.Fragment>
		
	);
}



const ListWrapper = styled.div`

`;

