import React from 'react';
import { connect } from 'react-redux';
import { addItemAction } from '../../redux/cart/cart.actions';

import './collection-item.style.scss';

import CustomButton from '../custom-button/custom-button.component';

const CollectionItem = ({ item, addItem }) => {
	const { name, price, imageUrl } = item;
	return (
		<div className='collection-item'>
			<div
				className='image'
				style={{
					backgroundImage: `url(${imageUrl})`,
				}}
			/>
			<div className='collection-footer'>
				<span className='name'>{name}</span>
				<span className='price'>€{price}</span>
			</div>
			<CustomButton inverted onClick={() => addItem(item)}>
				Add to cart
			</CustomButton>
		</div>
	);
};

const mapDispatchToProps = dispatch => ({
	addItem: item => dispatch(addItemAction(item)),
});

export default connect(null, mapDispatchToProps)(CollectionItem);
