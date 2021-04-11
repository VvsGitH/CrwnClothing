import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { auth } from '../../firebase/firebase.utils';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectCartHidden } from '../../redux/cart/cart.selectors';

import './header.style.scss';

import { ReactComponent as Logo } from '../../assets/crown.svg';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

const Header = ({ currentUser, isCartHidden }) => (
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
			{currentUser ? (
				<div className='option' onClick={() => auth.signOut()}>
					SIGN OUT
				</div>
			) : (
				<Link className='option' to='/signin'>
					SIGN IN
				</Link>
			)}
			<CartIcon />
		</nav>
		{isCartHidden ? null : <CartDropdown />}
	</div>
);

const mapStateToProps = state => ({
	currentUser: selectCurrentUser(state),
	isCartHidden: selectCartHidden(state),
});

export default connect(mapStateToProps)(Header);
