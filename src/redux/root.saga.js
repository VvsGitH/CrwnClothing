import { all, call } from 'redux-saga/effects';

import { onFetchCollectionsStart } from './shop/shop.saga';

export default function* rootSaga() {
	yield all([call(onFetchCollectionsStart)]);
}
