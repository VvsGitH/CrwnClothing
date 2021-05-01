import React from 'react';
import { withRouter } from 'react-router-dom';

import './error-boundary.style.scss';

class ErrorBoundary extends React.Component {
	constructor() {
		super();

		this.state = {
			hasError: false,
			error: null,
			errorInfo: null,
		};
	}

	// Viene chiamata durante la fase di render quando un componente figlio
	//  incorre in un errore.
	// E' comunemente usata per settare uno stato di errore, grazie al quale
	//  si renderizza una pagina fallback
	static getDerivedStateFromError(_error) {
		return { hasError: true };
	}

	// E' simile al metodo precedente ma viene chiamato in ritardo e
	//  permette dunque di eseguire dei side-effects come ad esempio il
	//  logging dell'errore.
	// Riceve anche un oggetto info che contiene maggiori informazioni
	//  sull'errore.
	componentDidCatch(error, errorInfo) {
		this.setState({
			error,
			errorInfo,
		});
	}

	// Utilizzo il prop location passato da withRouter per pulire lo stato
	//  di errore quando l'utente clicca su un'altra pagina.
	componentDidUpdate(prevProps) {
		if (this.props.location !== prevProps.location) {
			this.setState({
				hasError: false,
				error: null,
				errorInfo: null,
			});
		}
	}

	// Uso lo stato hasError per renderizzare una fallback in caso di errore
	render() {
		// Pagina di errore
		if (this.state.hasError) {
			return (
				<div className='error-boundary'>
					<img
						className='error-image'
						src='https://i.imgur.com/yW2W9SC.png'
						alt='error'
					/>
					<h2 className='error-msg'>Sorry this page is broken</h2>
					<details className='error-details'>
						{this.state.error && this.state.error.toString()}
						<br />
						{this.state.errorInfo && this.state.errorInfo.componentStack}
					</details>
				</div>
			);
		}

		// Renderizzo i componenti normalmente
		return this.props.children;
	}
}

export default withRouter(ErrorBoundary);
