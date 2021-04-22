import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import './collection-preview.style.scss';

import CollectionItem from '../collection-item/collection-item.component';

const CollectionPreview = ({ title, items }) => {
	const history = useHistory();
	const { pathname } = useLocation();

	const linkUrl = title.toLowerCase();

	return (
		<div className='collection-preview'>
			<h1
				className='title'
				onClick={() => history.push(`${pathname}/${linkUrl}`)}>
				{title.toUpperCase()}
			</h1>
			<div className='preview'>
				{items
					.filter((_, idx) => idx < 4)
					.map(item => (
						<CollectionItem key={item.id} item={item} />
					))}
			</div>
		</div>
	);
};

export default CollectionPreview;
