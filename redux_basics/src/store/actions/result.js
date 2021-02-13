import * as actionTypes from './actionTypes';

//sync version of an action creator
export const saveResult = payload => {
	return {
		type: actionTypes.STORE_RESULT,
		payload: { ...payload },
	};
};

//async action creator which is possible due to redux-thunk middleware
export const storeResult = payload => {
	return (dispatch, getState) => {
		setTimeout(() => {
			const oldState = getState().counter.counter;
			console.log(oldState);
			dispatch(saveResult(payload));
		}, 2000);
	};
};

export const deleteResult = payload => {
	return {
		type: actionTypes.DELETE_RESULT,
		payload: { ...payload },
	};
};
