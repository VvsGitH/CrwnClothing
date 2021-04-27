import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { toggleCartHiddenAction } from '../../redux/cart/cart.actions';
import {
	selectCartItems,
	selectCartIsFetching,
	selectCartDbError,
} from '../../redux/cart/cart.selectors';

import './cart-dropdown.style.scss';

import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
import Spinner from '../spinner/spinner.component';

const CartDropdown = ({ cartItems, toggleCart, isLoading, dbError }) => {
	const history = useHistory();

	const renderCart = () => {
		if (isLoading) return <Spinner />;

		if (dbError) {
			console.error(dbError);
			return (
				<span className='empty-message'>
					Sync Error, please refresh the page
				</span>
			);
		}

		if (!cartItems.length)
			return <span className='empty-message'>Your cart is empty</span>;

		return cartItems.map(cartItem => (
			<CartItem key={cartItem.id} item={cartItem} />
		));
	};

	return (
		<div className='cart-dropdown'>
			<div className='cart-items'>{renderCart()}</div>
			<CustomButton
				onClick={() => {
					history.push('/checkout');
					toggleCart();
				}}>
				GO TO CHECKOUT
			</CustomButton>
		</div>
	);
};

const mapStateToProps = state => ({
	cartItems: selectCartItems(state),
	isLoading: selectCartIsFetching(state),
	dbError: selectCartDbError(state),
});

const mapDispatchToProps = dispatch => ({
	toggleCart: () => dispatch(toggleCartHiddenAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartDropdown);
