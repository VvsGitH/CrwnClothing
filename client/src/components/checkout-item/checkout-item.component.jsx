import React from 'react';
import { connect } from 'react-redux';
import {
	clearItemAction,
	addItemAction,
	removeItemAction,
} from '../../redux/cart/cart.actions';

import './checkout-item.style.scss';

const CheckoutItem = ({ cartItem, clearItem, addItem, removeItem }) => {
	const { name, imageUrl, price, quantity } = cartItem;

	const handleKeyPress = e => {
		switch (e.code) {
			case 'ArrowLeft':
				removeItem(cartItem);
				break;
			case 'ArrowRight':
				addItem(cartItem);
				break;
			default:
				break;
		}
	};

	return (
		<section className='checkout-item'>
			<img src={imageUrl} alt='item' />
			<span className='name'>{name}</span>
			<span
				className='quantity'
				role='button'
				tabIndex='0'
				onKeyUp={handleKeyPress}>
				{/* eslint-disable-next-line */}
				<div className='arrow' onClick={() => removeItem(cartItem)}>
					&#10094;
				</div>
				<span className='value'>{quantity}</span>
				{/* eslint-disable-next-line */}
				<div className='arrow' onClick={() => addItem(cartItem)}>
					&#10095;
				</div>
			</span>
			<span className='price'>{`€${price * quantity}`}</span>
			<button className='remove-button' onClick={() => clearItem(cartItem)}>
				&#10005;
			</button>
		</section>
	);
};

const mapDispatchToProps = dispatch => ({
	clearItem: item => dispatch(clearItemAction(item)),
	addItem: item => dispatch(addItemAction(item)),
	removeItem: item => dispatch(removeItemAction(item)),
});

export default connect(null, mapDispatchToProps)(CheckoutItem);
