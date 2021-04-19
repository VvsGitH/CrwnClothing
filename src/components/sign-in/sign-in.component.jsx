import React from 'react';
import { connect } from 'react-redux';
import {
	googleSignInStart,
	emailSignInStart,
} from '../../redux/user/user.actions';

import './sign-in.style.scss';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

class SignIn extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
		};
	}

	// Al submit del form invio una action che avvia la procedura di sign-in gestita da una redux-saga
	// Faccio la stessa cosa con il sign-in with google, direttamente nel JSX
	handleSubmit = async event => {
		event.preventDefault();
		const { email, password } = this.state;
		this.props.emailSignInStart(email, password);
	};

	/* Questa funzione aggiorna continuamente lo stato in base al contenuto dei form.
	event.target.name contiene il nome del form; event.target.value contiene la stringa digitata nel form
	Inserisco dunque la stringa 'value' nello stato che si chiama 'name' */
	handleChange = event => {
		const { value, name } = event.target;
		this.setState({ [name]: value });
	};

	render() {
		return (
			<div className='sign-in'>
				<h2>I already have an account</h2>
				<span>Sign in with your email and password</span>
				<form onSubmit={this.handleSubmit}>
					<FormInput
						type='email'
						name='email'
						value={this.state.email}
						required
						inputLabel='Email'
						handleChange={this.handleChange}
					/>
					<FormInput
						type='password'
						name='password'
						value={this.state.password}
						required
						inputLabel='Password'
						handleChange={this.handleChange}
					/>
					<div className='buttons'>
						<CustomButton type='submit'>Sign In</CustomButton>
						<CustomButton
							type='button'
							onClick={this.props.googleSignInStart}
							isGoogleSignIn={true}>
							Sign in with Google
						</CustomButton>
					</div>
				</form>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	googleSignInStart: () => dispatch(googleSignInStart()),
	emailSignInStart: (email, password) =>
		dispatch(emailSignInStart({ email, password })),
});

export default connect(null, mapDispatchToProps)(SignIn);
