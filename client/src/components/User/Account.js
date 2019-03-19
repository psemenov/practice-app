import React, { Component } from 'react';
import {MainConsumer} from '../../context';
import SignIn from './SignIn';
import Profile from './Profile';

export default class Account extends Component {
	render() {
		return (
			<div>
				<MainConsumer>
					{value => {
			  			const {token} = value;
			  			if (!token) return <SignIn value={value} />
			  			return <Profile value={value} />
			  	}}
				</MainConsumer>
			</div>
		);
	}
}
