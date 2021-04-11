import { compose } from 'redux';
import { connect } from 'react-redux';

import CollectionsOverview from './collections-overview.component';
import WithSpinner from '../with-spinner/with-spinner.component';

const mapStateToProps = state => ({
	isLoading: state.shop.isFetching,
});

const CollectionsOverviewContainer = compose(
	connect(mapStateToProps),
	WithSpinner
)(CollectionsOverview);

export default CollectionsOverviewContainer;

/*
Questo container si occupa di: 
1. recuperare il valore isFetching dallo stato dallo Store e salvarlo nel prop isLoading
2. inglobare collections-overview in WithSpinner, che necessita del prop isLoading
*/
