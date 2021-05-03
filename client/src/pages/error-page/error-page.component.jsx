import React from 'react';

import './error-page.style.scss';

const ErrorPage = ({ errorImage, errorMsg, errorName, errorInfo }) => (
	<div className='error-page'>
		<img className='error-image' src={errorImage} alt='error' />
		<h2 className='error-msg'>{errorMsg}</h2>
		{(errorName || errorInfo) && (
			<details className='error-details'>
				{errorName && <span>{errorName}</span>}
				<br />
				{errorInfo && <span>{errorInfo}</span>}
			</details>
		)}
	</div>
);

ErrorPage.defaultProps = {
	errorName: null,
	errorInfo: null,
};

export default ErrorPage;
