import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

export default class Dropdown extends React.Component {
 	handleClick = () => {
 		if(this.props.smallScreen) document.getElementById('collapseButton').click();
 	}
	render() {
		const {menuLinks} = this.props;
		return(
			<DropdownWrapper style={{width: '100%'}}>
				<div className="dropdown">
						<Link to={this.props.linkPath} role="button" className="nav-link dropdown-toggle" id={this.props.id} data-toggle="dropdown"> 
	    		{this.props.linkTitle}
	    		
	    	</Link>
				
		    	<div className="dropdown-menu" aria-labelledby={this.props.id}>
		    		{menuLinks.map(item => {
		    			let linkpath = "/products/" + item.category;
		    			if(item.type !== '') linkpath = linkpath + '/' + item.type;
							return (
		    				<Link className="dropdown-item " key={item.id} to={linkpath}
		    				onClick={this.handleClick}>{item.linkTitle}</Link>
		    			);
						})}
					</div>
		    </div>
	    </DropdownWrapper>
		);			
	}
}

const DropdownWrapper = styled.div`
	@media (max-width: 767px) {
		.dropdown-item {
			background-color: #4A494D;
			border-top: 1px solid var(--mainOrange);

		}
	}
	.dropdown-toggle::after{
    display: none;
	}


	.dropdown-item {
		color: var(--mainWhite) !important;
		font-size: 1.1rem;
		text-transform: capitalize;
		padding: 0.5rem 0.5rem;
	}

	.dropdown-menu {
		 background-color: var(--mainBlack);
		 border-radius: 0;
		 margin: 0;
		 padding: 0;
		 border-top: 0.1rem solid var(--mainOrange);
	}

	.dropdown-item:hover, .dropdown-item:active, .dropdown-item:focus {
		background-color: var(--mainLightBlack);
		color: var(--mainOrange) !important;
	}

	.dropdown-item:active {
		background-color: #333237;
	}
`;