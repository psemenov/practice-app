import React from 'react';
import CartItem from './CartItem';
import styled from 'styled-components';

export default function CartList({value}) {
	const {cart} = value;

	return(
		<CartListWrapper>
			<div className="container-fluid">
				<div className="info-container p-4">
					<div className="title-container">
						<p className="ml-3">Your Cart</p>
					</div>
					{cart.map(item => {
						return (
							<CartItem key={item.id} item={item} value={value} />
						);
					})}	
				</div>	
			</div>
		</CartListWrapper>
	);
}

const CartListWrapper = styled.div`
	.info-container {
		background: white !important;
	  border: 0.07rem solid rgba(0,0,0,0.2);
	  box-shadow: 0.07rem 0.07rem 0px 0px rgba(0,0,0,0.2);
	}

	.title-container {
		font-family: 'Fjalla One', cursive;
		font-weight: bold;
		font-size: 2rem;
	}
`;