import React from 'react';
import styled from 'styled-components';

export default function EmptyCart() {
	return(
		<EmptyCartWrapper>
			<div>
				<p className="title-empty py-3">Your cart is currently empty</p>
			</div>
		</EmptyCartWrapper>
	);
}

const EmptyCartWrapper = styled.div`
	.title-empty {
		font-family: Fjalla One, cursive;
		font-size: 2rem;
		text-align: center;
	}
`;