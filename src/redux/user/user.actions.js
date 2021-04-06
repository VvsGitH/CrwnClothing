import { UserActionTypes } from './user.types';

export const setCurrentUserAction = user => ({
	type: UserActionTypes.SET_CURRENT_USER,
	payload: user,
});
