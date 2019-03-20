import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {MainConsumer, context} from '../../context';

export default function ProductInfo(props) {
	const {_id, title, img, price, info, amount} = props.product;
	return(
		<InfoWrapper>
			<div className="container-fluid">
					<div className="info-container py-5">

						<div className="row">
							<div className="left-column col-10 col-md-4 offset-1">
								<div className="title-container">
									<p>{title}</p>
								</div>
								<div className="img-container">
									<img src={img} className="info-img" alt=""/>
								</div>
							</div>
							<div className="right-column col-10 col-md-5 offset-1">
								<p className="price">${price}</p>		
								{amount > 0 ? <p className="in-stock">{amount} in stock</p>
									: <p className="not-in-stock">Not in stock</p>}
								<p>Product description:</p>
								<p className="description">{info}</p>
								<MainConsumer>
					        {(value) => (
										<Link to="/cart" className="add-link" onClick={() => value.addToCart(_id)}>
											<div className="add-btn p-3">
												<i className="fas fa-shopping-cart"></i>
												&ensp;Add to cart
											</div>
										</Link>		
					        )}
					  		</MainConsumer>
								
							</div>
						</div>
					</div>
			</div>
		</InfoWrapper>	
	);
}

const InfoWrapper = styled.div`
	
	.info-container {
		background: white !important;
	  border: 0.07rem solid rgba(0,0,0,0.2);
	  box-shadow: 0.07rem 0.07rem 0px 0px rgba(0,0,0,0.2);
	}

	.add-link {
		text-decoration: none;
		color: var(--mainWhite) !important;
	}

	.add-btn {
		text-align: center;
		border-radius: 0.5rem;
		background: var(--mainOrange) !important;
	}

	.add-btn:hover {
		background: var(--mainDarkOrange) !important;
	}

	.img-container {
		overflow: hidden;
	}

	.info-img {
		width: 100%;
	}

	.description {
		font-size: 1.25rem;
	}

	.title-container {
		font-family: 'Fjalla One', cursive;
		font-weight: bold;
		font-size: 2rem;
	}

	.right-column {
		font-size: 1.5rem;
		font-family: 'Fjalla One', cursive;
	}

	.price {
		color: var(--mainDarkRed) !important;
		font-size: 2rem;
		font-weight: bold;
	}

	.in-stock {
		color: var(--mainDarkGreen) !important;
	}

	.not-in-stock {
		color: var(--mainDarkGrey) !important;
	}
`;