import React, { Component, useContext} from 'react';
import Product from './Product';
import Filter from './Filter';
import styled from 'styled-components';
import {MainConsumer, context} from '../../context';
import { Redirect } from 'react-router-dom';
import Default from '../Default';

export default function ProductList(props) {
	let {category, type} = props.match.params;
	if(!type) type = "none";

	const contextValue = useContext(context);
	const title = contextValue.getTitle(category, type);
	console.log(title);
	return (
		<React.Fragment>
			{title === "unknown" ? <Default /> : 
			<div className="container-fluid">
				<div className="row p-3">
					<h2 className="text-center w-100">{title}</h2>
				</div>
				<div className="product-list row ml-md-3 ml-lg-5 mt-2">
					<Filter />
					<div className="col-lg-9 col-md-8 list mr-md-3 mr-lg-3">
						<ListWrapper>
							<div className="col">
								<div className="row">
									<MainConsumer>
		                {(value) => {
											let tempProducts = value.getByCategoryAndType(category, type);
		                  if(tempProducts.length > 0)
		                  return tempProducts.map(product => {
		                    return <Product key={product.id} product={product} />
		                  })
		                }}
	            		</MainConsumer>
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

