import React, { Component } from 'react';
import {setUserInStorage} from '../../data';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const apiPath = "http://localhost:5000";

export default class SignIn extends Component {
	constructor(props) {
		super(props);
		this.state =  {
	    signInError: '',
	    signUpError: '',
	    signInEmail: '',
	    signInPassword: '',  
			signUpFirstName: '',
			signUpLastName: '',
			signUpEmail: '',
			signUpPassword: '',
			token: '',
			renderSignIn: true
	  }

	  this.onTextBoxChangeSignInEmail = this.onTextBoxChangeSignInEmail.bind(this);
	  this.onTextBoxChangeSignInPassword = this.onTextBoxChangeSignInPassword.bind(this);
	  this.onTextBoxChangeSignUpEmail = this.onTextBoxChangeSignUpEmail.bind(this);
	  this.onTextBoxChangeSignUpPassword = this.onTextBoxChangeSignUpPassword.bind(this);
	  this.onTextBoxChangeSignUpFirstName = this.onTextBoxChangeSignUpFirstName.bind(this);
	  this.onTextBoxChangeSignUpLastName = this.onTextBoxChangeSignUpLastName.bind(this);

	  this.onSignIn = this.onSignIn.bind(this);
	  this.onSignUp = this.onSignUp.bind(this);
	  this.changeRender = this.changeRender.bind(this);
	  this.signIn = this.signIn.bind(this);
	}

  onTextBoxChangeSignInEmail(event) {
  	this.setState({
  		signInEmail: event.target.value
  	});
  }

  onTextBoxChangeSignInPassword(event) {
  	this.setState({
  		signInPassword: event.target.value
  	});
  }

  onTextBoxChangeSignUpEmail(event) {
  	this.setState({
  		signUpEmail: event.target.value
  	});
  }

  onTextBoxChangeSignUpPassword(event) {
  	this.setState({
  		signUpPassword: event.target.value
  	});
  }
  onTextBoxChangeSignUpFirstName(event) {
  	this.setState({
  		signUpFirstName: event.target.value
  	});
  }

  onTextBoxChangeSignUpLastName(event) {
  	this.setState({
  		signUpLastName: event.target.value
  	});
  }

  signIn() {
  	const {
  		signInEmail,
  		signInPassword,
  		signInError,
  		token
  	} = this.state;

  	fetch(apiPath + '/api/account/signin', {
  		method: 'POST',
  		headers: {
		    'Content-Type': 'application/json'
		  },
  		body: JSON.stringify({
  			email: signInEmail,
  			password: signInPassword
  		})
  	}).then(res => res.json())
      .then(json => {
      	if(json.success) {
      		setUserInStorage('user_token', {token: json.token});
	        this.setState({
	        	signInError: json.message,
						signInEmail: '',
						signInPassword: '',
						token: json.token
	        });
	        window.location.reload(false); 
	      } else {
	      	 this.setState({
	        	signInError: json.message,
	    	  });
	      }
      });
  }

  onSignIn(event) {
  	event.preventDefault();
		this.signIn();
  }

  onSignUp(event) {
  	event.preventDefault();
  	const {
  		signUpFirstName,
  		signUpLastName,
  		signUpEmail,
  		signUpPassword
  	} = this.state;

  	fetch(apiPath + '/api/account/signup', {
  		method: 'POST',
  		headers: {
		    'Content-Type': 'application/json'
		  },
  		body: JSON.stringify({
  			firstName: signUpFirstName,
  			lastName: signUpLastName,
  			email: signUpEmail,
  			password: signUpPassword
  		})
  	}).then(res => res.json())
      .then(json => {
      	if(json.success) {

	        this.setState({
	        	signUpError: json.message,
	        	signUpFirstName: '',
						signUpLastName: '',
						signUpEmail: '',
						signUpPassword: '',
						signInEmail: signUpEmail,
						signInPassword: signUpPassword
	        });
	        this.signIn();
	      } else {
	      	 this.setState({
	        	signUpError: json.message,
	    	  });
	      }
      });
  }

  changeRender() {
		this.setState(prevState => ({
      renderSignIn: !prevState.renderSignIn,
    }));
  }

	render() {
		const {
			signInEmail,
			signInPassword,
			signInError,
			signUpError,
			signUpFirstName,
			signUpLastName,
			signUpEmail,
			signUpPassword
		} = this.state; 

		return (
			<SignWrapper>
				
					
				{ (this.state.renderSignIn) ? (
				<div className="container">
					<form className="mx-auto my-4 col-lg-4 col-md-6 col-sm-8 col-10">
						<h1 className="text-center">Sign In</h1>
						{
							(signInError) ? (
							<div className="row">
								<div className="alert alert-danger m-0 p-2 w-100" role="alert">
								  {signInError}
								</div>
							</div>) : (null)
						}
						<div className="row my-4">
							<input type="email" className="form-control" placeholder="Email" value={signInEmail} onChange={this.onTextBoxChangeSignInEmail} />
						</div>
						<div className="row my-4">
							<input type="password" className="form-control" placeholder="Password" value={signInPassword} onChange={this.onTextBoxChangeSignInPassword} />
						</div>
						<div className="row my-4">
							<button className="btn btn-block sign-btn" onClick={this.onSignIn}>Sign In</button>
						</div>
						<div className="row my-4">
							<p className="mx-auto">Don't have an account? <Link to="/account" onClick={this.changeRender}>Sign Up</Link></p>
						</div>
					</form>
				</div>
					) : (
					<div className="container">
						<form className="mx-auto my-4 col-lg-4 col-md-6 col-sm-8 col-10">
							<h1 className="text-center">Sign Up</h1>
							{
							(signUpError) ? (
								<div className="row">
									<div className="alert alert-danger m-0 p-2 w-100" role="alert">
									  {signUpError}
									</div>
								</div>) : (null)
							}
							<div className="row my-4">
								<input type="text" className="form-control" placeholder="First Name" value={signUpFirstName} onChange={this.onTextBoxChangeSignUpFirstName} />
							</div>
							<div className="row my-4">
								<input type="text" className="form-control" placeholder="Last Name" value={signUpLastName} onChange={this.onTextBoxChangeSignUpLastName} />
							</div>
							<div className="row my-4">
								<input type="email" className="form-control" placeholder="Email" value={signUpEmail} 
								required onChange={this.onTextBoxChangeSignUpEmail} />
							</div>
							<div className="row my-4">
								<input type="password" className="form-control" placeholder="Password" value={signUpPassword} onChange={this.onTextBoxChangeSignUpPassword} />
							</div>
							<div className="row my-4">
								<button className="btn btn-block sign-btn" onClick={this.onSignUp}>Sign Up</button>
							</div>
							<div className="row my-4">
								<p className="mx-auto">Already have an account? <Link to="/account" onClick={this.changeRender}>Sign In</Link></p>
							</div>
						</form>
					</div>)}

			</SignWrapper>
		);
	}
}

const SignWrapper = styled.div`

	.sign-btn {
		background: var(--mainOrange) !important;
		color: var(--mainWhite) !important;
	}

	.sign-btn:hover {
		background: var(--mainDarkOrange) !important;
		color: var(--mainDarkWhite) !important;
	}

	.form-control:focus, .form-control:active {
  outline: none;
  box-shadow: none !important;
  border: 1.5px solid var(--mainGrey) !important;
}
`;