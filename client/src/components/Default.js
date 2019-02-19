import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

export default function Default(props) {
	return(
		<DefaultWrapper>
		<div className="container-fluid">
			<div className="msg text-center">
				<h1>404</h1>
				<h3>We're sorry, we couldn't find the page you requested.</h3>
				<Link className="btn btn-outline-dark" to="/" role="button">Back to the main page</Link>
			</div>
		</div>
		</DefaultWrapper>
	);
}

const DefaultWrapper = styled.div`
	.msg {
		margin-top: 7rem;
	}
	
	.msg h1 {
		font-family: 'Fredoka One', cursive;
		font-size: 8rem;
	}
	.msg .btn {
		margin-top: 1.5rem;
		font-size: 1.3rem;
	}

	.msg .btn:hover {
		background-color: var(--mainBlack) !important;
	}
`;