import * as actionTypes from '../actions/actionTypes';
import { updateObject } from './../utility';

const initialState = {
	token: null,
	userID: null,
	error: null,
	loading: null,
};

const authStart = (state) => {
	return updateObject(state, { error: null, loading: true });
};
const authSuccess = (state, payload) => {
	return updateObject(state, {
		token: payload.IDtoken,
		userID: payload.userID,
		error: null,
		loading: false,
	});
};
const authFail = (state, payload) => {
	return updateObject(state, { error: payload.error, loading: false });
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case actionTypes.AUTH_START:
			return authStart(state);

		case actionTypes.AUTH_SUCCESS:
			return authSuccess(state, payload);

		case actionTypes.AUTH_FAIL:
			return authFail(state, payload);

		default:
			return state;
	}
};
