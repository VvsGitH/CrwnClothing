import React from 'react';
import { Route, Redirect } from 'react-router';
import { connect } from 'react-redux';
import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSesson } from './redux/user/user.actions';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignPage from './pages/sign-page/sign-page.component';
import Header from './components/header/header.component';
import CheckoutPage from './pages/checkout/checkout.component';

class App extends React.Component {
	componentDidMount() {
		// Firebase conserva l'autenticazione dell'utente tra le sessioni
		// Tuttavia lo stato user nello Store si resetta ogni volta che l'app viene refreshata
		// Uso una action per verificare lo stato di autenticazione ogni volta che App viene montata e cioè dopo ogni refresh del browser.
		// Se l'utente è ancora autenticato in Firebase, lo stato user verrà aggiornato con i suoi dati.
		this.props.checkUserSesson();
	}

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
	checkUserSesson: () => dispatch(checkUserSesson()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
