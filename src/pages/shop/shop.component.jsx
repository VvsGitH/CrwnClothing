import React from 'react';
import { Route } from 'react-router-dom';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

const ShopPage = ({ match }) => (
	<div className='shop-page'>
		<Route exact path={`${match.path}`} component={CollectionsOverview} />
		<Route path={`${match.path}/:collectionId`} component={CollectionPage} />
	</div>
);

/*
Uso ShopPage solo per fare il routing tra la pagina di preview e le varie pagine dedicate alle singole collezioni.

Da App.js il browser arriva in shop.jsx quando il path include /shop, quindi sia cliccando sul pulsante SHOP, sia cliccando su una delle collezioni. Dunque in ShopPage, match.path sarà sempre uguale a '/shop'.
A questo punto, se l'url della pagina è esattamente uguale a /shop, renderizzo la pagina di preview; se invece contiene un altro elemento, come /shop/hats, allora inserisco /hats nel parametro url collectionId e renderizzo la pagina CollectionPage: gli elementi mostrati in questa pagina variano proprio in base al valore contenuto nel parametro collectionId.
NOTA: il paramentro collectionId esisterà nel prop match di CollectionPage e non in quello di ShopPage!

Usare i parametri url è un modo elegante per gestire una situazione in cui ho tante pagine uguali tra loro in struttura e stile, ma che variano in base al loro contenuto. Il modo alternativo, più semplice ma meno elegante, sarebbe stato quello di definire manualmente una route per ogni collezione.
*/

export default ShopPage;
