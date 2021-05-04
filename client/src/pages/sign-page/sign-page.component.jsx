import React from 'react';

import './sign-page.style.scss';

import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';

const SignPage = () => (
	<main className='sign-page'>
		<SignIn />
		<SignUp />
	</main>
);

export default SignPage;
