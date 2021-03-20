import React from 'react';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

import './sign-up.style.scss';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

class SignUp extends React.Component {
	constructor() {
		super();

		this.state = {
			displayName: '',
			email: '',
			password: '',
			confirmPassword: '',
		};
	}

	// Questa funzione interagisce con le API di Firebase per l'autenticazione e per il database al fine di registrare un nuovo utente
	handleSubmit = async event => {
		event.preventDefault();

		// Prendo i dati inseriti nel form e verifico che i campi password siano uguali
		const { displayName, email, password, confirmPassword } = this.state;
		if (password !== confirmPassword) {
			alert("passwords don't match");
			return;
		}

		try {
			// Uso l'API di autenticazione di Firebase per tentare la registrazione del nuovo utente
			const { user } = await auth.createUserWithEmailAndPassword(
				email,
				password
			);

			// Se tutto va bene, aggiungo il nuovo utente anche nel database. NOTA: newUser contiene solo email e UID, quindi aggiungo anche il nome
			await createUserProfileDocument(user, { displayName });

			// Se tutto va bene, pulisco i campi del form
			this.setState({
				displayName: '',
				email: '',
				password: '',
				confirmPassword: '',
			});
		} catch (error) {
			console.error(error);
		}
	};

	// Carico costantemente nello stato i valori inseriti nei form
	handleChange = event => {
		const { name, value } = event.target;
		this.setState({ [name]: value });
	};

	render() {
		const { displayName, email, password, confirmPassword } = this.state;
		return (
			<div className='sign-up'>
				<h2 className='title'>I do not have an account</h2>
				<span>Sign up with your email and password</span>
				<form className='sign-up-form' onSubmit={this.handleSubmit}>
					<FormInput
						type='text'
						name='displayName'
						value={displayName}
						onChange={this.handleChange}
						inputLabel='Name'
						required
					/>
					<FormInput
						type='email'
						name='email'
						value={email}
						onChange={this.handleChange}
						inputLabel='Email'
						required
					/>
					<FormInput
						type='password'
						name='password'
						value={password}
						onChange={this.handleChange}
						inputLabel='Password'
						required
					/>
					<FormInput
						type='password'
						name='confirmPassword'
						value={confirmPassword}
						onChange={this.handleChange}
						inputLabel='Confirm Password'
						required
					/>
					<CustomButton type='submit'>SIGN UP</CustomButton>
				</form>
			</div>
		);
	}
}

export default SignUp;
