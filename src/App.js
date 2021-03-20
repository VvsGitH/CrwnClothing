import React from 'react';
import { Route } from 'react-router';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

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

	// ------------------- AUTHENTICATION ------------------- //
	unsubscribeFromAuth = null;

	componentDidMount() {
		/* auth.onAuthStateChanged() apre una connessione persistente con firebase che invocherà la funzione di callback ogni volta che cambierà lo stato di autenticazione: utente fa log-in, log-out, fallisce il log-in
		auth.onAuthStateChanged() restituisce una funzione che ci permetterà di chiudere la connessione */
		this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
			// Se l'utente ha fatto log-in
			if (userAuth) {
				// Cerco l'utente nel database e lo aggiungo se non è presente
				const userRef = await createUserProfileDocument(userAuth);

				// onSnapshot() restituisce uno snapshot aggiornato di userRef. Viene chiamata la prima volta e poi ogni volta che il database rileva una modifica su userRef
				userRef.onSnapshot(snapshot => {
					// Utilizzo lo snapshot per creare lo stato utente
					this.setState({
						currentUser: {
							id: snapshot.id,
							...snapshot.data(),
						},
					});
				});
			} else {
				// Se l'utente ha fatto log-out o non è riuscito a fare log-in, setta lo stato a null
				this.setState({
					currentUser: null,
				});
			}
		});
	}

	componentWillUnmount() {
		// Chiudo la connessione
		this.unsubscribeFromAuth();
	}

	// ------------------- RENDER METHOD ------------------- //
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
