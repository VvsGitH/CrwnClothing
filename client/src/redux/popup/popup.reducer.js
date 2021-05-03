import PopupActionsTypes from './popup.types';

const INITIAL_STATE = {
	isHidden: true,
	isSuccess: true,
	message: '',
};

const popupReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case PopupActionsTypes.CREATE_POPUP:
			return {
				...state,
				isHidden: false,
				isSuccess: action.payload.isSuccess,
				message: action.payload.message,
			};
		case PopupActionsTypes.HIDE_POPUP:
			return {
				...state,
				isHidden: true,
			};
		default:
			return state;
	}
};

export default popupReducer;
