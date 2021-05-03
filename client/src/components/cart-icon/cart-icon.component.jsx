import React from 'react';
import { connect } from 'react-redux';
import { toggleCartHiddenAction } from '../../redux/cart/cart.actions';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

import './cart-icon.style.scss';

// Se importassi il file svg come componente, esso verrebbe rirenderizzato ogni volta che viene rirenderizzao CartIcon, anche se cambia solo itemCount.
import ShoppingIcon from '../../assets/shopping-bag.svg';

const CartIcon = ({ toggleCartHidden, itemCount }) => (
	<div
		className='cart-icon'
		role='button'
		tabIndex='0'
		onClick={toggleCartHidden}
		onKeyUp={e => e.code === 'Enter' && toggleCartHidden()}>
		<img src={ShoppingIcon} alt='Cart Icon' className='shopping-icon' />
		<span className='item-count'>{itemCount}</span>
	</div>
);

// Tutte le funzioni che prendono lo stato nello Store e ne estraggono una piccola porzione sono dette selectors.
// Utilizzo questo selector per aggiorare il numero di elementi nell'icona del carrello
const mapStateToProps = state => ({
	itemCount: selectCartItemsCount(state),
});

const mapDispatchToProps = dispatch => ({
	toggleCartHidden: () => dispatch(toggleCartHiddenAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
