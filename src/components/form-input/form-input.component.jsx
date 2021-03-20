import React from "react";

import "./form-input.style.scss";

const FormInput = ({ handleChange, inputLabel, ...otherProps }) => (
	<div className='group'>
		<input className='form-input' onChange={handleChange} {...otherProps} />
		<label
			className={
				"form-input-label " + (otherProps.value.length ? "shrink" : "")
			}>
			{inputLabel}
		</label>
	</div>
);

export default FormInput;
