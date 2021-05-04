import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { selectCollection } from '../../redux/shop/shop.selectors';

import './collection.style.scss';

import CollectionItem from '../../components/collection-item/collection-item.component';

const CollectionPage = ({ collection }) => {
	// Riporto la pagina al top
	// Utile per quando si accede ad una collezione dallo shop
	useEffect(() => window.scrollTo(0, 0), []);

	const { title, items } = collection;

	return (
		<main className='collection-page'>
			<h2 className='title'>{title.toUpperCase()}</h2>
			<div className='items' role='grid'>
				{items.map(item => (
					<CollectionItem key={item.id} item={item} />
				))}
			</div>
		</main>
	);
};

const mapStateToProps = (state, ownProps) => ({
	// Questo si chiama currying.
	// selectCollection(urlParam) restituisce la funzione createSelector(state) che necessita dello stato.
	// In JS questa è la sintassi per passare un argomento alla funzione restituita da un'altra funzione.
	collection: selectCollection(ownProps.match.params.collectionId)(state),
});

export default connect(mapStateToProps)(CollectionPage);
