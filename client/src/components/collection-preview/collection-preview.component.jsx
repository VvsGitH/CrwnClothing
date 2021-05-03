import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import './collection-preview.style.scss';

import CollectionItem from '../collection-item/collection-item.component';

const CollectionPreview = ({ title, items, routeName, match }) => (
	<div className='collection-preview'>
		<Link className='title' to={`${match.url}/${routeName}`}>
			{title.toUpperCase()}
		</Link>
		<div className='preview'>
			{items
				.filter((_, idx) => idx < 4)
				.map(item => (
					<CollectionItem key={item.id} item={item} />
				))}
		</div>
	</div>
);

export default withRouter(CollectionPreview);
