import { compose } from 'redux';
import { connect } from 'react-redux';

import Collections from './collection.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

const mapStateToProps = state => ({
	isLoading: state.shop.isFetching,
});

const CollectionsContainer = compose(
	connect(mapStateToProps),
	WithSpinner
)(Collections);

export default CollectionsContainer;

/*
Questo container si occupa di: 
1. recuperare il valore isFetching dallo stato dallo Store e salvarlo nel prop isLoading
2. inglobare collections in WithSpinner, che necessita del prop isLoading
*/
