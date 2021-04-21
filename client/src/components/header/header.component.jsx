import React from 'react';
import { connect } from 'react-redux';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { signOutStart } from '../../redux/user/user.actions';
import { selectCartHidden } from '../../redux/cart/cart.selectors';

import {
	HeaderStyle,
	LogoStyle,
	OptionsStyle,
	OptionLinkStyle,
} from './header.style';

import { ReactComponent as Logo } from '../../assets/crown.svg';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

const Header = ({ currentUser, isCartHidden, signOutStart }) => (
	<HeaderStyle>
		<LogoStyle to='/'>
			<Logo />
		</LogoStyle>
		<OptionsStyle>
			<OptionLinkStyle to='/shop'>SHOP</OptionLinkStyle>
			<OptionLinkStyle to='/contact'>CONTACT</OptionLinkStyle>
			{currentUser ? (
				<OptionLinkStyle as='div' onClick={signOutStart}>
					SIGN OUT
				</OptionLinkStyle>
			) : (
				<OptionLinkStyle to='/signin'>SIGN IN</OptionLinkStyle>
			)}
			<CartIcon />
		</OptionsStyle>
		{isCartHidden ? null : <CartDropdown />}
	</HeaderStyle>
);

const mapStateToProps = state => ({
	currentUser: selectCurrentUser(state),
	isCartHidden: selectCartHidden(state),
});

const mapDispatchToProps = dispatch => ({
	signOutStart: () => dispatch(signOutStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
