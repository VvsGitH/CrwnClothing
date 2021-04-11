import React from 'react';
import { Route, Redirect } from 'react-router';
import { connect } from 'react-redux';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUserAction } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignPage from './pages/sign-page/sign-page.component';
import Header from './components/header/header.component';
import CheckoutPage from './pages/checkout/checkout.component';

class App extends React.Component {
	// ------------------- AUTHENTICATION ------------------- //
	unsubscribeFromAuth = null;
	unsubscribeFromDb = null;

	componentDidMount() {
		/* auth.onAuthStateChanged() apre una connessione persistente con firebase che invocherà la funzione di callback ogni volta che cambierà lo stato di autenticazione: utente fa log-in, log-out, fallisce il log-in
		auth.onAuthStateChanged() restituisce una funzione che ci permetterà di chiudere la connessione */
		this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
			// Se l'utente ha fatto log-in
			if (userAuth) {
				// Cerco l'utente nel database e lo aggiungo se non è presente
				const userRef = await createUserProfileDocument(userAuth);

				// onSnapshot() restituisce uno snapshot aggiornato di userRef. Viene chiamata la prima volta e poi ogni volta che il database rileva una modifica su userRef
				this.unsubscribeFromDb = userRef.onSnapshot(snapshot => {
					// Utilizzo lo snapshot per creare lo stato utente
					this.props.setCurrentUser({
						id: snapshot.id,
						...snapshot.data(),
					});
				});
			} else {
				// Se l'utente ha fatto log-out o non è riuscito a fare log-in, setta lo stato a null
				this.props.setCurrentUser(userAuth);
				this.unsubscribeFromDb && this.unsubscribeFromDb();
			}
		});
	}

	componentWillUnmount() {
		// Chiudo la connessione
		this.unsubscribeFromAuth();
		this.unsubscribeFromDb && this.unsubscribeFromDb();
	}

	// ------------------- RENDER METHOD ------------------- //
	render() {
		return (
			<div className='App'>
				<Header />
				<Route exact path='/' component={HomePage} />
				<Route path='/shop' component={ShopPage} />
				<Route exact path='/checkout' component={CheckoutPage} />
				<Route
					exact
					path='/signin'
					render={() =>
						this.props.currentUser ? <Redirect to='/' /> : <SignPage />
					}
				/>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	currentUser: selectCurrentUser(state),
});

const mapDispatchToProps = dispatch => ({
	setCurrentUser: user => dispatch(setCurrentUserAction(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
