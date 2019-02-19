import React from 'react';
import {Link} from 'react-router-dom'
import styled from 'styled-components';

export default function Product(props) {
	const {id, title, img, price, amount} = props.product;

	return(
		<ProductWrapper className="col-md-6 col-lg-4 col-xl-3 my-3 p-0 p-md-3">
			<div className="card text-capitalize"> 
				<div className="img-container p-0">
					 <Link to="/details">
					 		<img src={img} alt="product" className="card-img-top" />
					 </Link>
				</div>
				<div className="card-body px-3 py-1">
					<div className="card-title">
						<Link to="/details" className="card-link text-black text-center ">
	            {title}
	          </Link>
					</div>
				</div>
				<div className="card-footer d-flex justify-content-between mt-0 pt-1 px-3">
					<h6 className="card-subtitle mb-0 pt-2 text-green">{amount > 0 ? "in stock" : "not in stock"}</h6>
          <h5 className="font-italic mb-0 align-self-center text-darkred">
            <span className="mr-1">$</span>
            {price}
          </h5>
        </div>
			</div>
		</ProductWrapper>
	);
}

const ProductWrapper = styled.div`
	.card {
	   border-color: transparent;
	}

	.card-footer, .card-body {
	  background: transparent;
	  border-top: transparent;
	}

	&:hover {
	  .card {
	    border: 0.07rem solid rgba(0,0,0,0.2);
	    box-shadow: 1px 1px 5px 0px rgba(0,0,0,0.2);
	  }

	  .card-footer, .card-body {
	    background: var(--mainWhite) !important;
	  }
  	
  	.img-container {
		  position: relative;
		  overflow: hidden;
		}
	}

	.card-title {
    white-space: nowrap; 
    overflow: hidden;
		text-overflow: ellipsis;
	}
	
`;