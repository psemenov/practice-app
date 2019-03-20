import React, { Component } from 'react';
import {removeProductFromStorage} from '../../data';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const apiPath = "http://localhost:5000";

export default class Profile extends Component {
	constructor(props){
		super(props);

		this.state = {
			token: this.props.value.token,
			email: '',
			firstName: '',
			lastName: '',
			oldPassword: '',
			newPassword: '',
			newPassword2: '',
			updateError: '',
			passwordError: '',
			success: false
		}
		this.logoutUser = this.logoutUser.bind(this);
		this.onTextBoxChangeEmail = this.onTextBoxChangeEmail.bind(this);
		this.onTextBoxChangeFirstName = this.onTextBoxChangeFirstName.bind(this);
		this.onTextBoxChangeLastName = this.onTextBoxChangeLastName.bind(this);
		this.onTextBoxChangeOldPassword = this.onTextBoxChangeOldPassword.bind(this);
		this.onTextBoxChangeNewPassword = this.onTextBoxChangeNewPassword.bind(this);
		this.onTextBoxChangeNewPassword2 = this.onTextBoxChangeNewPassword2.bind(this);
		this.updateUserInfo = this.updateUserInfo.bind(this);
		this.changePassword = this.changePassword.bind(this);
	}

	componentDidMount() {
		const {token} = this.state;
		fetch(apiPath + '/api/account/getinfo?token=' + token) 
      .then(res => res.json())
      .then(json => {
        if(json.success) {
        	console.log(json.info)
          this.setState({
            email: json.info[0].email,
            firstName: json.info[0].firstName,
            lastName: json.info[0].lastName
          });
         	// window.location.reload(false); 
        }
      });
	}

onTextBoxChangeEmail(event) {
  	this.setState({
  		email: event.target.value
  	});
  }

  onTextBoxChangeFirstName(event) {
  	this.setState({
  		firstName: event.target.value
  	});
  }

  onTextBoxChangeLastName(event) {
  	this.setState({
  		lastName: event.target.value
  	});
  }

  onTextBoxChangeOldPassword(event) {
  	this.setState({
  		oldPassword: event.target.value
  	});
  }
  onTextBoxChangeNewPassword(event) {
  	this.setState({
  		newPassword: event.target.value
  	});
  }

  onTextBoxChangeNewPassword2(event) {
  	this.setState({
  		newPassword2: event.target.value
  	});
  }

  updateUserInfo(event) {
  	event.preventDefault();
  	const {
  		email,
  		firstName,
  		lastName,
  		token,
  		success
  	} = this.state;

  	fetch(apiPath + '/api/account/update_user', {
  		method: 'POST',
  		headers: {
		    'Content-Type': 'application/json'
		  },
  		body: JSON.stringify({
  			email: email,
  			firstName: firstName,
  			lastName: lastName,
  			token
  		})
  	}).then(res => res.json())
      .then(json => {
      	if(json.success) {
	        this.setState({
	        	updateError: json.message,
	        	success: true
	        });
	        // window.location.reload(false); 
	      } else {
	      	 this.setState({
	        	updateError: json.message,
	        	success: false
	    	  });
	      }
      });
  }

  changePassword(event) {
  	event.preventDefault();
  	const {
  		oldPassword,
  		newPassword,
  		newPassword2,
  		token,
  		success,
  		passwordError
  	} = this.state;
  	if(oldPassword.length == 0 || newPassword.length == 0 || newPassword2.length == 0) {
  		return null;
  	}
  	fetch(apiPath + '/api/account/change_password', {
  		method: 'POST',
  		headers: {
		    'Content-Type': 'application/json'
		  },
  		body: JSON.stringify({
  			oldPassword: oldPassword,
  			newPassword: newPassword,
  			newPassword2: newPassword2,
  			token: token
  		})
  	}).then(res => res.json())
      .then(json => {
      	if(json.success) {
	        this.setState({
	        	passwordError: json.message,
	        	success: true
	        });
	        // window.location.reload(false); 
	      } else {
	      	 this.setState({
	        	passwordError: json.message,
	        	success: false
	    	  });
	      }
      });
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
		const {
			email,
			firstName,
			lastName,
			oldPassword,
			newPassword,
			newPassword2,
			updateError,
			passwordError
		} = this.state;

		return (
			<ProfileWrapper>
				<div className="container-fluid">
					<div className="row">
						<div className="profile-container col-10 offset-1 my-4 p-0">
							<ul className="nav nav-tabs" id="myTab" role="tablist">
							  <li className="nav-item">
							    <a className="nav-link active" id="info-tab" data-toggle="tab" href="#info" 
							    role="tab" aria-controls="info" aria-selected="true">Personal Information</a>
							  </li>
							  <li className="nav-item">
							    <a className="nav-link" id="purchase-tab" data-toggle="tab" href="#purchase" 
							    role="tab" aria-controls="purchase" aria-selected="false">Purchase History</a>
							  </li>
							  <li className="nav-item">
							    <a className="nav-link" id="change-password-tab" data-toggle="tab" href="#change-password" 
							    role="tab" aria-controls="change-password" aria-selected="false">Change Password</a>
							  </li>
							  <li className="nav-item">
							    <Link className="nav-link" id="logout-tab" data-toggle="tab" to="/" 
							    onClick={this.logoutUser}>Logout</Link>
							  </li>
							</ul>

							<div className="tab-content">
							  <div className="tab-pane active container-fluid" id="info" role="tabpanel" aria-labelledby="info-tab">
							  	<form>
							  		{
											(updateError) ? (
											<div className="row my-4">
												{(!this.state.success) ?
												 <div className="alert alert-danger col-lg-4 col-md-6 col-sm-8 col-10 mx-auto" role="alert">
												  {updateError}
													</div>
												: <div className="alert alert-success col-lg-4 col-md-6 col-sm-8 col-10 mx-auto" role="alert">
												  {updateError}
													</div>
												}
											</div>) : (null)
										}
										<div className="row my-4">
											<div className="col-lg-4 col-md-6 col-sm-8 col-10 mx-auto">
												<label htmlFor="email">Email: </label>
												<input type="email" id="email" className="form-control" value={email} onChange={this.onTextBoxChangeEmail} />
											</div>
										</div>
										<div className="row my-4">
											<div className="col-lg-4 col-md-6 col-sm-8 col-10 mx-auto">
												<label htmlFor="firstName">First Name: </label>
												<input type="text" id="firstName" className="form-control" value={firstName} onChange={this.onTextBoxChangeFirstName} />
											</div>
										</div>
										<div className="row my-4">
											<div className="col-lg-4 col-md-6 col-sm-8 col-10 mx-auto">
												<label htmlFor="lastName">Last Name: </label>
												<input type="text" id="lastName" className="form-control" value={lastName}  onChange={this.onTextBoxChangeLastName} />
											</div>
										</div>		
										<div className="row my-4">
											<div className="col-lg-4 col-md-6 col-sm-8 col-10 mx-auto">
												<button className="btn btn-block save-btn" onClick={this.updateUserInfo}>Save</button>
											</div>
										</div>				
									</form>
							  </div>
							  <div className="tab-pane" id="purchase" role="tabpanel" aria-labelledby="purchase-tab">afasdfasdf</div>
							  <div className="tab-pane" id="change-password" role="tabpanel" aria-labelledby="change-password-tab">
									<form>
									{
											(passwordError) ? (
											<div className="row my-4">
												{(!this.state.success) ?
												 <div className="alert alert-danger col-lg-4 col-md-6 col-sm-8 col-10 mx-auto" role="alert">
												  {passwordError}
													</div>
												: <div className="alert alert-success col-lg-4 col-md-6 col-sm-8 col-10 mx-auto" role="alert">
												  {passwordError}
													</div>
												}
											</div>) : (null)
										}
										<div className="row my-4">
											<div className="col-lg-4 col-md-6 col-sm-8 col-10 mx-auto">
												<label htmlFor="old">Old password: </label>
												<input type="password" id="old" className="form-control" value={oldPassword} onChange={this.onTextBoxChangeOldPassword} />
											</div>
										</div>
										<div className="row my-4">
											<div className="col-lg-4 col-md-6 col-sm-8 col-10 mx-auto">
												<label htmlFor="new">New password: </label>
												<input type="password" id="new" className="form-control" value={newPassword} onChange={this.onTextBoxChangeNewPassword} />
											</div>
										</div>
										<div className="row my-4">
											<div className="col-lg-4 col-md-6 col-sm-8 col-10 mx-auto">
												<label htmlFor="new2">Repeat new password: </label>
												<input type="password" id="new2" className="form-control" value={newPassword2} onChange={this.onTextBoxChangeNewPassword2} />
											</div>
										</div>		
										<div className="row my-4">
											<div className="col-lg-4 col-md-6 col-sm-8 col-10 mx-auto">
												<button className="btn btn-block save-btn" onClick={this.changePassword}>Save</button>
											</div>
										</div>				
									</form>
							  </div>
							  <div className="tab-pane" id="settings" role="tabpanel" aria-labelledby="settings-tab"><button onClick={this.logoutUser}>Logout</button></div>
							</div>
							</div>
						</div>
										

					</div>
			</ProfileWrapper>
		);
	}
}

const ProfileWrapper = styled.div`	

		.profile-container {
			background: white !important;
		  border: 0 0.07rem solid rgba(0,0,0,0.2);
		  box-shadow: 0.07rem 0.07rem 0px 0px rgba(0,0,0,0.2);
		}

		.nav-link, .nav-item {
			border-left: none !important;
			border-top: none !important;
			border-right: none !important;
			border-radius: 0;
			color: var(--mainGrey) !important;
		} 

		.nav-link.active {
			color: var(--mainBlack) !important;
			background: var(--mainDarkWhite) !important;
		}

		.nav-tabs {
			border: none !important;
		}

		.save-btn {
			background: var(--mainOrange) !important;
			color: var(--mainWhite) !important;
		}

		.save-btn:hover {
			background: var(--mainDarkOrange) !important;
			color: var(--mainDarkWhite) !important;
		}

		.form-control:focus, .form-control:active {
		  outline: none;
		  box-shadow: none !important;
		  border: 1.5px solid var(--mainGrey) !important;
		}
`;
