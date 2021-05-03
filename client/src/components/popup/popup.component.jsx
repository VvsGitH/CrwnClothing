import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useTransition, animated } from '@react-spring/web';

import { hidePopup } from '../../redux/popup/popup.actions';
import { selectPopup } from '../../redux/popup/popup.selectors';

import './popup.style.scss';

const Popup = () => {
	const { isSuccess, message, isHidden } = useSelector(
		selectPopup,
		shallowEqual
	);
	const dispatch = useDispatch();

	// Uso useEffect per aggiungere un listener a window che individua i
	//  click del mouse e nasconde il popup se è visibile.
	// Con questo metodo, non serve neanche implementare una funzione onClick
	//  per il pulsante OK del Popup, in quanto il listener individuerà ogni
	//  click fatto dall'utente.

	useEffect(() => {
		console.log('###### POPUP EFFECT ######');

		const closePopup = () => !isHidden && dispatch(hidePopup());

		window.addEventListener('click', closePopup);

		return () => window.removeEventListener('click', closePopup);
	}, [isHidden, dispatch]);

	// Creo le animazioni di compasa/scomparsa del Popup.

	const transition = useTransition(!isHidden, {
		from: { opacity: 0, scale: 0 },
		enter: { opacity: 1, scale: 1 },
		leave: { opacity: 0, scale: 0 },
	});

	// Renderizzo il componente oppure null
	// Con questo approccio, il componente Popup resta sempre montato in App
	//  anche quando non è visibile. In tale stato è semplicemente una funzione
	//  che restituisce null.
	// Ho scelto questo approccio in modo da dare al componente Popup tutta la
	//  responsabilità circa il suo stato, lasciando ad altri componenti solo
	//  la facoltà di creare un nuovo popup.
	// Inoltre, in questo modo, posso creare le transizioni internamente al
	//  componente Popup, al posto di lasciare tale compito al componente
	//  che effettua il suo montaggio/smontaggio.

	const iconContent = isSuccess ? '\u2714' : '\u2718';
	const popupClass = isSuccess ? 'success' : 'fail';
	const popupTitle = isSuccess ? 'Success!' : 'Ooops!';

	const renderPopup = style => (
		<animated.div className={`popup ${popupClass}`} style={style}>
			<div className='popup-flex'>
				<div className='popup-header'>
					<div className='popup-icon'>{iconContent}</div>
					<h2 className='popup-title'>{popupTitle}</h2>
				</div>
				<p className='popup-message'>{message}</p>
				<button className='popup-btn'>OK</button>
			</div>
		</animated.div>
	);

	return transition((style, item) => (item ? renderPopup(style) : null));
};

export default Popup;
