import React from 'react';

import './with-spinner.style.scss';

// Icona rotante di caricamento
const Spinner = () => (
	<div className='spinner-overlay'>
		<div className='spinner-container'></div>
	</div>
);

// High Order Component
// è una funzione che prende in ingresso un componente, detto WrappedComponent, e restituisce un'altro componente che ne espande le funzionalità. Tale componente deve prendere in ingresso tutti i props del WrappedComponent, in aggiunta ai suoi props.
// In questo caso, il componente restituito dal HOC renderizza condizionalmente l'icona di caricamento o il WrappedComponent. In pratica, permette di nascondere il WrappedComponent finchè il caricamento di qualcosa non è terminato.
const WithSpinner = WrappedComponent => {
	// Creo un componente che amplia le funzioni di WrappedComponent
	const EnhancedComponent = ({ isLoading, ...otherProps }) => {
		return isLoading ? <Spinner /> : <WrappedComponent {...otherProps} />;
	};

	// Restituisco il componente migliorato
	return EnhancedComponent;
};

export default WithSpinner;
