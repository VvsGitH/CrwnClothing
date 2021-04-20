import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
	// Stripe richiede il prezzo in centesimi
	const priceForStripe = price * 100;
	const publishableKey =
		'pk_test_51IdzPmIUjLpE2nbZ3A6ht7ocAmBfypAXGg3v4JIZQNRq8pcaLeviscqWa3YxzpdNQN0A4XOpaPhmhyBB7x52kkKh00U3kcdfFh';

	// Il token serve ad interagire con il backend. In questo caso non processiamo un vero pagamento e quindi ci limitiamo a loggarlo
	const onToken = token => {
		console.log(token);
		alert('Payment Successful');
	};

	return (
		<StripeCheckout
			label='Pay Now'
			name='CRWN Clothing Ltd.'
			billingAddress
			shippingAddress
			description={'Your total is €' + price}
			amount={priceForStripe}
			panelLabel='Pay Now'
			token={onToken}
			stripeKey={publishableKey}
		/>
	);
};

export default StripeCheckoutButton;
