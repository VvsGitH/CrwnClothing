import React from 'react';
import { connect } from 'react-redux';
import {
	selectCartTotal,
	selectCartItems,
} from '../../redux/cart/cart.selectors';

import './checkout.style.scss';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component';

const CheckoutPage = ({ cartItems, total }) => (
	<main className='checkout-page'>
		<article>
			<header className='checkout-header'>
				<span>Product</span>
				<span>Description</span>
				<span>Quantity</span>
				<span>Price</span>
				<span>Remove</span>
			</header>

			{cartItems.map(cartItem => (
				<CheckoutItem key={cartItem.id} cartItem={cartItem} />
			))}

			<section className='total'>
				<span>{`TOTAL: €${total}`}</span>
			</section>
		</article>

		{total > 0 ? (
			<section className='pay-section'>
				<p className='test-warning'>
					*Please use the following test credit card for payments*
					<br />
					4242 4242 4242 4242 - Exp: 01/24 - CVV: 123
				</p>
				<StripeCheckoutButton price={total} />
			</section>
		) : null}
	</main>
);

const mapStateToProps = state => ({
	cartItems: selectCartItems(state),
	total: selectCartTotal(state),
});

export default connect(mapStateToProps)(CheckoutPage);
