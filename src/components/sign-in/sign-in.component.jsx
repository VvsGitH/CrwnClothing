import React from 'react';
import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

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

	// Questa funzione si interfaccia con l'API di autenticazione di Firebase per far fare o meno login all'utente
	handleSubmit = async event => {
		event.preventDefault();
		try {
			// Provo a fare login con i dati contenuti nei form
			const { email, password } = this.state;
			await auth.signInWithEmailAndPassword(email, password);

			// Svuoto i campi del form. Questa riga viene eseguita solo se la riga precente è terminata senza errore!
			this.setState({ email: '', password: '' });
		} catch (error) {
			console.log(error);
		}
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
						<CustomButton type='submit'>Submit Form </CustomButton>
						<CustomButton
							type='button'
							onClick={signInWithGoogle}
							isGoogleSignIn={true}>
							Sign in with Google{' '}
						</CustomButton>
					</div>
				</form>
			</div>
		);
	}
}

export default SignIn;
