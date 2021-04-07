import React from 'react';
import { connect } from 'react-redux';

import CollectionPreview from '../../components/collection-preview/collection-preview.component';

const ShopPage = ({ collections }) => (
	<div className='shop-page'>
		{collections.map(({ id, ...otherProps }) => (
			<CollectionPreview key={id} {...otherProps} />
		))}
	</div>
);

const mapStateToProps = state => ({
	collections: state.shop.collections,
});

export default connect(mapStateToProps)(ShopPage);
