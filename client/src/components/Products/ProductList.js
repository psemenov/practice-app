import React, { Component } from 'react';
import Product from './Product';
import Filter from './Filter';
import styled from 'styled-components';
// {this.props.match.params.category}
// 				{this.props.match.params.type ? this.props.match.params.type : "default"}
export default class ProductList extends Component {
	render() {
		return (
			<div className="container-fluid">
				<div className="row p-3">
					<h2 className="text-center w-100">Bass Guitars</h2>
				</div>
				<div className="row mt-2">
					<Filter />
					<div className="col-xl-10 col-lg-9 col-md-8 list">
						<ListWrapper>
							<div className="container-fluid">
								<div className="row">
									<Product />
									<Product />
									<Product />
									<Product />
									<Product />
									<Product />
									<Product />
									<Product />							
									<Product />
									<Product />
									<Product />
									<Product />
								</div>
							</div>
						</ListWrapper>
					</div>			
				</div>
			</div>
		);
	}
}



const ListWrapper = styled.div`

`;

