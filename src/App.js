import React from 'react';
import { Route } from 'react-router';
import { auth } from './firebase/firebase.utils';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignPage from './pages/sign-page/sign-page.component';
import Header from './components/header/header.component';

class App extends React.Component {
	constructor() {
		super();

		this.state = {
			currentUser: null,
		};
	}

	// Persistent user authentication
	unsubscribeFromAuth = null;

	componentDidMount() {
		// Apro una connessione persistente con firebase che aggiornerà automaticamente lo stato.
		// auth.onAuthStateChanged() restituisce una funzione che ci permetterà di chiudere la connessione
		this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
			this.setState({ currentUser: user });
		});
	}

	componentWillUnmount() {
		// Chiudo la connessione
		this.unsubscribeFromAuth();
	}

	render() {
		return (
			<div className='App'>
				<Header currentUser={this.state.currentUser} />
				<Route exact path='/' component={HomePage} />
				<Route path='/shop' component={ShopPage} />
				<Route path='/signin' component={SignPage} />
			</div>
		);
	}
}

export default App;
