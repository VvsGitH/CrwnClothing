import React from 'react';

import CustomButtonStyle from './custom-button.style';

const CustomButton = ({ children, ...props }) => (
	<CustomButtonStyle {...props}>{children}</CustomButtonStyle>
);

export default CustomButton;
