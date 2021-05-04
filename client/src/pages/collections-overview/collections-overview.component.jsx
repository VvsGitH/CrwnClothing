import React from 'react';
import { connect } from 'react-redux';
import { selectCollectionsForPreview } from '../../redux/shop/shop.selectors';

import './collections-overview.style.scss';

import CollectionPreview from '../../components/collection-preview/collection-preview.component';

const CollectionsOverview = ({ collections }) => (
	<main className='collections-overview'>
		{collections.map(({ id, ...otherProps }) => (
			<CollectionPreview key={id} {...otherProps} />
		))}
	</main>
);

const mapStateToProps = state => ({
	collections: selectCollectionsForPreview(state),
});

export default connect(mapStateToProps)(CollectionsOverview);
