import React from 'react';
import { signInWithGoogle } from '../../firebase/firebase.utils';

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

	handleSubmit = event => {
		event.preventDefault();

		this.setState({ email: '', password: '' });
	};

	handleChange = event => {
		// 'name' contiene il nome dell'elemento che sta cambiando, cioè email o password; 'value' contiene il contenuto di tale elemento, cioè ciò che sta digitando l'utente -> non so quanto è sicuro questo approccio
		const { value, name } = event.target;
		// Questo codice significa: inserisci 'value' all'interno dello stato che si chiama 'name'
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
						<CustomButton onClick={signInWithGoogle} isGoogleSignIn={true}>
							Sign in with Google{' '}
						</CustomButton>
					</div>
				</form>
			</div>
		);
	}
}

export default SignIn;
