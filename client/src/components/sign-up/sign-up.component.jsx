import React, { useState } from 'react';
import { connect } from 'react-redux';
import { signUpStart } from '../../redux/user/user.actions';

import './sign-up.style.scss';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

const SignUp = ({ signUp }) => {
	const [userFormInput, setFormInput] = useState({
		displayName: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const { displayName, email, password, confirmPassword } = userFormInput;

	// Questa funzione interagisce con le API di Firebase per l'autenticazione e per il database al fine di registrare un nuovo utente
	const handleSubmit = async event => {
		event.preventDefault();

		// Prendo i dati inseriti nel form e verifico che i campi password siano uguali
		if (password !== confirmPassword) {
			alert("passwords don't match");
			return;
		}

		// Redux action che triggera una redux saga
		signUp({ email, password, displayName });
	};

	// Carico costantemente nello stato i valori inseriti nei form
	const handleChange = event => {
		const { name, value } = event.target;
		setFormInput({ ...userFormInput, [name]: value });
	};

	return (
		<div className='sign-up'>
			<h2 className='title'>I do not have an account</h2>
			<span>Sign up with your email and password</span>
			<form className='sign-up-form' onSubmit={handleSubmit}>
				<FormInput
					type='text'
					id='sign-up-disp-name'
					name='displayName'
					value={displayName}
					onChange={handleChange}
					inputLabel='Name'
					required
				/>
				<FormInput
					type='email'
					id='sign-up-email'
					name='email'
					value={email}
					onChange={handleChange}
					inputLabel='Email'
					required
				/>
				<FormInput
					type='password'
					id='sign-up-pass'
					name='password'
					value={password}
					onChange={handleChange}
					inputLabel='Password'
					required
				/>
				<FormInput
					type='password'
					id='sign-up-conf-pass'
					name='confirmPassword'
					value={confirmPassword}
					onChange={handleChange}
					inputLabel='Confirm Password'
					required
				/>
				<CustomButton type='submit'>SIGN UP</CustomButton>
			</form>
		</div>
	);
};

const mapDispatchToProps = dispatch => ({
	signUp: userCredentials => dispatch(signUpStart(userCredentials)),
});

export default connect(null, mapDispatchToProps)(SignUp);
