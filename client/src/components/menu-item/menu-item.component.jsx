import React from 'react';
import { withRouter } from 'react-router-dom';

import './menu-item.style.scss';

/*
NOTA: Gestione dell'immagine di sfondo
E' possibile aggiungere l'immagine di sfondo direttamente al container principale menu-item, attraverso l'attributo style={{backgroundImage: }}. Tuttavia questo avrebbe reso impossibile ottenere l'effetto di espansione al passaggio del mouse, in quanto oltre alla immagine si sarebbe ingrandindo tutto.
Dunque, per ottenere quell'effetto, è stato necessario posizionare l'immagine in un div interno, fratello di 'content' e poi gestire la cosa in css
*/

const MenuItem = ({ title, imageUrl, size, linkUrl, history, match }) => (
	<div
		className={`menu-item ${size}`}
		role='link'
		tabIndex='0'
		onClick={() => history.push(`${match.url}${linkUrl}`)}
		onKeyUp={e => e.code === 'Enter' && history.push(`${match.url}${linkUrl}`)}>
		<div
			className='background-image'
			role='img'
			style={{ backgroundImage: `url(${imageUrl})` }}
		/>
		<div className='content'>
			<h1 className='title'>{title.toUpperCase()}</h1>
			<span className='subtitle'>SHOP NOW</span>
		</div>
	</div>
);

MenuItem.defaultProps = {
	size: '',
};

export default withRouter(MenuItem);
