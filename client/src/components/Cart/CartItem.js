import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

export default function CartItem({item, value}) {
	const {id, title, category, img, price, ordered} = item;
	const {increment, decrement, removeItem} = value;
	return (
		<CartItemWrapper>
			<div className="row d-flex align-items-center my-4">
				<div className="col-10 mx-auto col-lg-2">
					<Link to={"/details/" + category + "/" + id}>
						<img src={img} className="cart-img ml-5" alt=""/>
					</Link>
				</div>
				<div className="col-10 mx-auto col-lg-4">
					<Link to={"/details/" + category + "/" + id}  className="title-link">
						<span>{title}</span>
					</Link>
				</div>
				<div className="col-10 mx-auto col-lg-1">
					<span className="ml-5">${price}</span>
				</div>
				<div className="col-10 mx-auto col-lg-2 my-2 my-lg-0">
					<div className="d-flex justify-content-center">
						<span className="btn" onClick={() => decrement(id)}><i class="fas fa-minus"></i></span>
						<span className="btn">{ordered}</span>
						<span className="btn" onClick={() => increment(id)}><i class="fas fa-plus"></i></span>
					</div>
				</div>
				<div className="col-10 mx-auto col-lg-2">
					<span className="btn" onClick={() => removeItem(id)}><i class="fas fa-trash"></i></span>
				</div>
			</div>
		</CartItemWrapper>
	);
}

const CartItemWrapper = styled.div`
	color: var(--mainBlack) !important;
	font-size: 1.2rem;
	font-weight: 700;

	.cart-img {
		width: 5rem;
		height: 5rem;
	}

	.title-link {
		text-decoration: none;
		color: var(--mainBlack) !important;
		font-size: 1.2rem;
		text-overflow: ellipsis;
	}

	.btn {
		font-weight: 700;
		color: var(--mainLightBlack) !important;
	}
`;