import React, { Component } from 'react';
import styled from 'styled-components';
import FilterBody from './FilterBody';

export default class Filter extends Component {
	
	state = {
		x: false,
		show: "show"
	}

  componentDidMount() {
  	window.addEventListener("resize", this.resize);
  }
    

	resize = () => {
		let z = window.matchMedia("(max-width: 767px)");
		if(!(z.matches ^ this.state.x) && !z.matches ) 
			this.setState(() => {
				return {show: "show"};
			})
		else if(!(z.matches ^ this.state.x) && z.matches)
			this.setState(() => {
				return {show: ""};
			}) 
		this.setState(() => {
			return {x: z.matches};
		});
	}


	render() {
		console.log(this.state.x);
		return (
			<div className="col-xl-2 col-md-3 ml-4 mt-3 mx-auto">
						<FilterWrapper className="filter text-capitalize">
							<div className="filter-title">		
								<h3 className="d-none d-md-block text-center">filter</h3>					
								<button className="btn btn-block filter-btn d-md-none" type="button" data-toggle="collapse" data-target="#filterCollapse" 
								aria-expanded="false" aria-controls="filterCollapse">Filter</button>		
							</div>
							<div className={"filter-body collapse " + this.state.show} id="filterCollapse">
								<FilterBody />
							</div>
						</FilterWrapper>
					</div>	
		);
	}
}

const FilterWrapper = styled.div`
	background: transparent;
	border: 0.05rem solid var(--mainDarkWhite);
	border-radius: 0.3rem;
	
	.filter-btn {
		background-color: var(--mainGrey) !important;
		font-size: 1.5rem;
	}
	
	.filter-btn:focus, .filter-btn:active {
		background-color: var(--mainGrey) !important;
	}

	.filter-title {
		background-color: #E2E2E4;
		border-top-right-radius: 0.3rem;
		border-top-left-radius: 0.3rem;
		border-bottom: 0.5px solid var(--mainDarkWhite);
	}

	.filter-box {
		border-bottom: 0.5px solid var(--mainDarkWhite);
	}

	.custom-control {
		-webkit-user-select: none;
	  -moz-user-select: none;
	  -ms-user-select: none;
	  user-select: none;
	}

	.custom-control-input:focus ~ .custom-control-label::before {
    box-shadow: none;
	}

	.custom-control-input:checked ~ .custom-control-label::before {
		background-color: var(--mainOrange) !important;
		border-color: var(--mainGreen) !important;
	}
	
	.btn-collapse:focus {
		box-shadow: none !important;
	}
	
	i {
		pointer-events: none !important;
	}

	.show-btn {
		background-color: var(--mainOrange) !important;
		color: var(--mainWhite) !important;
	}

	.show-btn:hover {
		background-color: var(--mainDarkOrange) !important;
	}

	.show-btn:focus {
		box-shadow: none !important;
		outline: none !important;
	}

	.no-bb {
		border-bottom: none !important;
	}

	.box-content {
			font-size: 1.2rem;
	}

	@media (max-width: 767px) {
		.box-header {
			font-size: 1.6rem;
		}
		.box-content {
			font-size: 1.4rem;
		}

		.show-btn {
			font-size: 1.3rem;
		}
	}

	@media (max-width: 991px) {
		.box-header {
			font-size: 1.3rem;
		}
		.box-content {
			font-size: 1.1rem;
		}
	}

	.box-header {
		font-size: 1.2rem;
	}

	.box-content {
		font-size: 1rem;
	}
	

`;