import React, { Component } from 'react';

export default class ProductList extends Component {
	render() {
			console.log(this.props);

		return (
			<div>
				{this.props.match.params.category}
				{this.props.match.params.type ? this.props.match.params.type : "default"}
			</div>
		);
	}
}
