import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
	googleSignInStart,
	emailSignInStart,
} from '../../redux/user/user.actions';

import './sign-in.style.scss';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

const SignIn = ({ emailSignInStart, googleSignInStart }) => {
	const [userCredentials, setCredentials] = useState({
		email: '',
		password: '',
	});

	// Al submit del form invio una action che avvia la procedura di sign-in gestita da una redux-saga
	// Faccio la stessa cosa con il sign-in with google, direttamente nel JSX
	const handleSubmit = async event => {
		event.preventDefault();
		const { email, password } = userCredentials;
		emailSignInStart(email, password);
	};

	/* Questa funzione aggiorna continuamente lo stato in base al contenuto dei form.
	event.target.name contiene il nome del form; event.target.value contiene la stringa digitata nel form
	Inserisco dunque la stringa 'value' nello stato che si chiama 'name' */
	const handleChange = event => {
		const { value, name } = event.target;
		setCredentials({ ...userCredentials, [name]: value });
	};

	return (
		<div className='sign-in'>
			<h2>I already have an account</h2>
			<span>Sign in with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					type='email'
					id='sign-in-email'
					name='email'
					value={userCredentials.email}
					required
					inputLabel='Email'
					handleChange={handleChange}
				/>
				<FormInput
					type='password'
					id='sign-in-pass'
					name='password'
					value={userCredentials.password}
					required
					inputLabel='Password'
					handleChange={handleChange}
				/>
				<div className='buttons'>
					<CustomButton type='submit'>Sign In</CustomButton>
					<CustomButton
						type='button'
						onClick={googleSignInStart}
						isGoogleSignIn={true}>
						Sign in with Google
					</CustomButton>
				</div>
			</form>
		</div>
	);
};

const mapDispatchToProps = dispatch => ({
	googleSignInStart: () => dispatch(googleSignInStart()),
	emailSignInStart: (email, password) =>
		dispatch(emailSignInStart({ email, password })),
});

export default connect(null, mapDispatchToProps)(SignIn);
