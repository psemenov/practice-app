import React, { Component } from 'react';
import {MainConsumer} from '../../context';
import CartList from './CartList';
import EmptyCart from './EmptyCart';

export default class Cart extends Component {
	render () {
		return (
		  <section>
		  	<MainConsumer>
		  		{value => {
		  			const {cart} = value;
		  			if(cart.length > 0) {
		  				return (
		  					<React.Fragment>
									<CartList value={value} />
								</React.Fragment>
		  				);
		  			} else {
      				return (
      					<EmptyCart />
      				);
      			}
		  		}}
		  	</MainConsumer>
				
		  </section>
		)
	}
}
