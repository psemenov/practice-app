import React, { Component } from 'react';

export default class Search extends Component {
	render() {
		return (
			<div 
				className={`input-group my-auto col-md-5 col-12 offset-md-1 ${this.props.id === 'search-md' ? 'd-none d-md-inline-flex' : 'd-md-none'}`}>
			  <input type="text" className="form-control search-input" placeholder="Search products..." 
			  aria-label="Recipient's username" aria-describedby="button-addon2" />
			  <div className="input-group-append">
			    <button className="btn btn-outline-secondary search-button" type="button" id="button-addon2">
			    	<i className="fas fa-search search-icon" aria-hidden="true" />
			    </button>
			  </div>
			</div>
		)
	}
}
