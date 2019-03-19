import React, { Component } from 'react';
import {removeProductFromStorage} from '../../data';

const apiPath = "http://localhost:5000";

export default class Profile extends Component {
	constructor(props){
		super(props);

		this.state = {
			token: this.props.value.token
		}
		this.logoutUser = this.logoutUser.bind(this);
	}

	logoutUser() {
		const {token} = this.state;
		fetch(apiPath + '/api/account/logout?token=' + token) 
      .then(res => res.json())
      .then(json => {
        if(json.success) {
        	removeProductFromStorage('user_token');
          this.setState({
            token: ""
          });
         	window.location.reload(false); 
        }
      });
	}

	render() {
		return (
			<div>
				<p>Account</p>
				<button onClick={this.logoutUser}>Logout</button>
			</div>
		);
	}
}
