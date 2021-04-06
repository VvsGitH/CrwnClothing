import React from 'react';
import { connect } from 'react-redux';
import { toggleCartHiddenAction } from '../../redux/cart/cart.actions';

import './cart-icon.style.scss';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

const CartIcon = ({ toggleCartHidden }) => (
	<div className='cart-icon' onClick={toggleCartHidden}>
		<ShoppingIcon className='shopping-icon' />
		<span className='item-count'>0</span>
	</div>
);

const mapDispatchToProps = dispatch => ({
	toggleCartHidden: () => dispatch(toggleCartHiddenAction()),
});

export default connect(null, mapDispatchToProps)(CartIcon);
