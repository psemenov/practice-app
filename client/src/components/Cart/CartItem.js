import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

export default function CartItem({item, value}) {
	const {_id, title, category, img, price, ordered} = item;
	const {increment, decrement, removeItem} = value;
	return (
		<CartItemWrapper>
			<div className="row d-flex align-items-center my-4">
				<div className="col-4 col-sm-3 mx-auto col-lg-2">
					<Link to={"/details/" + category + "/" + _id}>
						<img src={img} className="cart-img ml-lg-5 ml-sm-3" alt=""/>
					</Link>
				</div>
				<div className="col-8 col-sm-9 mx-auto col-lg-4">
					<Link to={"/details/" + category + "/" + _id}  className="title-link">
						<span>{title}</span>
					</Link>
				</div>
				<div className="col-3 col-sm-2 offset-sm-3 offset-lg-0 mx-lg-auto col-lg-1">
					<span className="ml-xl-5 ml-lg-2">${price}</span>
				</div>
				<div className="col-7 col-sm-2 mx-sm-auto col-lg-2 my-2 my-lg-0">
					<div className="d-flex justify-content-center">
						<span className="btn" onClick={() => decrement(_id)}><i class="fas fa-minus"></i></span>
						<span className="btn">{ordered}</span>
						<span className="btn" onClick={() => increment(_id)}><i class="fas fa-plus"></i></span>
					</div>
				</div>
				<div className="col-2 col-sm-2 mx-sm-auto col-lg-2">
					<span className="btn" onClick={() => removeItem(_id)}><i class="fas fa-trash"></i></span>
				</div>
			</div>
		</CartItemWrapper>
	);
}

const CartItemWrapper = styled.div`
	@media (max-width: 575px) {
		font-size: 1rem;

	}

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
		text-overflow: ellipsis;
	}

	.btn {
		font-weight: 700;
		color: var(--mainLightBlack) !important;
	}
`;