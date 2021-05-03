import PopupActionsTypes from './popup.types';

export const createPopup = (isSuccess, message) => ({
	type: PopupActionsTypes.CREATE_POPUP,
	payload: { isSuccess, message },
});

export const hidePopup = () => ({
	type: PopupActionsTypes.HIDE_POPUP,
});
