import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

export default function CartTotals({value}) {
	const {cartTotal} = value;
	return(
		<CartTotalsWrapper>
			<div className="container-fluid">
				<div className="row">
					<div className="col-lg-11 mt-2 mr-lg-3 text-capitalize text-right total">
						<div>
							<span className="total-label">Total: </span>
							<span className="total-sum">${cartTotal}</span>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-11 d-flex justify-content-end">
						<Link to="/checkout" className="checkout-link text-left">
							<div className="checkout-btn py-2 px-3 my-2">
								<span>Proceed to checkout</span>
							</div>
						</Link>
					</div>
				</div>
			</div>
		</CartTotalsWrapper>
	);
}

const CartTotalsWrapper = styled.div`
	.total {
		font-family: 'Fjalla One', cursive;
		font-weight: bold;
		font-size: 1.5rem;
	}

	.total-sum {
		color: var(--mainDarkRed);
	}

	.checkout-link {
		text-decoration: none;
		color: var(--mainWhite) !important;
		font-weight: 500;
		font-size: 1rem;
	}

	.checkout-btn {
		text-align: center;
		border-radius: 0.5rem;
		background: var(--mainOrange) !important;
	}

	.checkout-btn:hover {
		background: var(--mainDarkOrange) !important;
	}
`;