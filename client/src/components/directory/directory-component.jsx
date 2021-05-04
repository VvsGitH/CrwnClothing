import React from 'react';
import { connect } from 'react-redux';
import { selectDirectorySections } from '../../redux/directory/directory.selectors';

import './directory-style.scss';

import MenuItem from '../menu-item/menu-item.component';

const Directory = ({ sections }) => (
	<nav className='directory-menu'>
		{sections.map(({ id, ...otherSectionProps }) => (
			<MenuItem key={id} {...otherSectionProps} />
		))}
	</nav>
);

const mapStateToProps = state => ({
	sections: selectDirectorySections(state),
});

export default connect(mapStateToProps)(Directory);
