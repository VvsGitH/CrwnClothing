import React from "react";
import { Link } from "react-router-dom";

import "./header.style.scss";

import { ReactComponent as Logo } from "../../assets/crown.svg";

const Header = () => (
	<div className='header'>
		<Link className='logo-container' to='/'>
			<Logo />
		</Link>
		<nav className='options'>
			<Link className='option' to='/shop'>
				SHOP
			</Link>
			<Link className='option' to='/contact'>
				CONTACT
			</Link>
		</nav>
	</div>
);

export default Header;
