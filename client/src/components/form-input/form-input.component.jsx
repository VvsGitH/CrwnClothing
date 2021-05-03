import React from 'react';

import './form-input.style.scss';

const FormInput = ({ id, value, handleChange, inputLabel, ...otherProps }) => (
	<div className='group'>
		<input
			className='form-input'
			id={id}
			value={value}
			onChange={handleChange}
			{...otherProps}
		/>
		<label
			className={`form-input-label ${value.length ? 'shrink' : ''}`}
			htmlFor={id}>
			{inputLabel}
		</label>
	</div>
);

export default FormInput;
