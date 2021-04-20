import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { clearCartAction } from '../../redux/cart/cart.actions';

import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
	// Uso un redux hook dato che devo fare il dispatch di una sola action
	const dispatch = useDispatch();

	// Stripe richiede il prezzo in centesimi
	const priceForStripe = price * 100;
	const publishableKey =
		'pk_test_51IdzPmIUjLpE2nbZ3A6ht7ocAmBfypAXGg3v4JIZQNRq8pcaLeviscqWa3YxzpdNQN0A4XOpaPhmhyBB7x52kkKh00U3kcdfFh';

	// Invio al backend il token ed il costo della transazione.
	// Ricevo dal backend il risultato dell'operazione.
	// Se il pagamento è riuscito rimuovo tutti gli elementi dal carrello.
	const onToken = token => {
		axios({
			url: 'payment',
			method: 'post',
			data: {
				amount: priceForStripe,
				token,
			},
		})
			.then(response => {
				console.log('Payment response: ', response);
				alert('Payment successful.');
				dispatch(clearCartAction());
			})
			.catch(error => {
				console.log('Payment error: ', error);
				alert('There was an issue with your payment.');
			});
	};

	return (
		<StripeCheckout
			label='Pay Now'
			name='CRWN Clothing Ltd.'
			billingAddress
			shippingAddress
			amount={priceForStripe}
			currency='EUR'
			description={'Your total is €' + price}
			panelLabel='Pay Now'
			token={onToken}
			stripeKey={publishableKey}
		/>
	);
};

export default StripeCheckoutButton;
