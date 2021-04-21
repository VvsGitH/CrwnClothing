import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
	signInWithEmailAsync,
	signInWithGoogleAsync,
} from '../../redux/user/user.actions';

import './sign-in.style.scss';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

const SignIn = ({ signInWithGoogle, signInWithEmail }) => {
	const [userCredentials, setCredentials] = useState({
		email: '',
		password: '',
	});

	// Al submit del form invio una action che gestisce la procedura asincrona di signIn
	// Faccio la stessa cosa con il sign-in with google, direttamente nel JSX
	const handleSubmit = async event => {
		event.preventDefault();
		signInWithEmail(userCredentials);
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
					name='email'
					value={userCredentials.email}
					required
					inputLabel='Email'
					handleChange={handleChange}
				/>
				<FormInput
					type='password'
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
						onClick={signInWithGoogle}
						isGoogleSignIn={true}>
						Sign in with Google
					</CustomButton>
				</div>
			</form>
		</div>
	);
};

const mapDispatchToProps = dispatch => ({
	signInWithGoogle: () => dispatch(signInWithGoogleAsync()),
	signInWithEmail: emailAndPassword =>
		dispatch(signInWithEmailAsync(emailAndPassword)),
});

export default connect(null, mapDispatchToProps)(SignIn);
