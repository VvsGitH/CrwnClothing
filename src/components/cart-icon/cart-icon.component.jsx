import React from 'react';
import { connect } from 'react-redux';
import { toggleCartHiddenAction } from '../../redux/cart/cart.actions';

import './cart-icon.style.scss';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

const CartIcon = ({ toggleCartHidden, itemCount }) => (
	<div className='cart-icon' onClick={toggleCartHidden}>
		<ShoppingIcon className='shopping-icon' />
		<span className='item-count'>{itemCount}</span>
	</div>
);

// Questo è un selector: prende lo stato e ne estrae una piccola porzione
// Utilizzo questo selector per aggiorare il numero di elementi nell'icona del carrello
const mapStateToProps = state => ({
	itemCount: state.cart.cartItems.reduce(
		(accumulator, cartItem) => accumulator + cartItem.quantity,
		0
	),
});

const mapDispatchToProps = dispatch => ({
	toggleCartHidden: () => dispatch(toggleCartHiddenAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
