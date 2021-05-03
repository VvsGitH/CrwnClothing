import React, { useEffect, lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { connect } from 'react-redux';

import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';

import './App.scss';

import Header from './components/header/header.component';
import Popup from './components/popup/popup.component';
import Spinner from './components/spinner/spinner.component';
import ErrorBoundary from './components/error-boundary/error-boundary.component';
import ErrorPage from './pages/error-page/error-page.component';

const HomePage = lazy(() => import('./pages/homepage/homepage.component'));
const ShopPage = lazy(() => import('./pages/shop/shop.component'));
const SignPage = lazy(() => import('./pages/sign-page/sign-page.component'));
const CheckoutPage = lazy(() => import('./pages/checkout/checkout.component'));

const App = ({ currentUser, checkUserSession }) => {
	// Firebase conserva l'autenticazione dell'utente tra le sessioni
	// Tuttavia lo stato user nello Store si resetta ogni volta che l'app viene refreshata
	// Uso una action per verificare lo stato di autenticazione ogni volta che App viene montata e cioè dopo ogni refresh del browser.
	// Se l'utente è ancora autenticato in Firebase, lo stato user verrà aggiornato con i suoi dati.
	useEffect(() => {
		checkUserSession();
	}, [checkUserSession]);

	return (
		<div className='App'>
			<Header />
			<Popup />
			<ErrorBoundary>
				<Suspense fallback={<Spinner />}>
					<Switch>
						<Route exact path='/' component={HomePage} />
						<Route path='/shop' component={ShopPage} />
						<Route exact path='/checkout' component={CheckoutPage} />
						<Route
							exact
							path='/signin'
							render={() => (currentUser ? <Redirect to='/' /> : <SignPage />)}
						/>
						<Route
							render={() => (
								<ErrorPage
									errorImage='https://i.imgur.com/Q2BAOd2.png'
									errorMsg='This Page is Not on the Map'
								/>
							)}
						/>
					</Switch>
				</Suspense>
			</ErrorBoundary>
		</div>
	);
};

const mapStateToProps = state => ({
	currentUser: selectCurrentUser(state),
});

const mapDispatchToProps = dispatch => ({
	checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
