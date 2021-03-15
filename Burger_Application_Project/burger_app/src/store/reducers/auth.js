import * as actionTypes from '../actions/actionTypes';
import { updateObject } from './../../shared/utility';

const initialState = {
	token: null,
	userID: null,
	error: null,
	loading: null,
	authRedirectPath: '/',
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

const authLogout = (state, payload) => {
	return updateObject(state, { token: null, userID: null });
};

const setAuthRedirectPath = (state, payload) => {
	return updateObject(state, { authRedirectPath: payload.path });
};

const reducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case actionTypes.AUTH_START:
			return authStart(state);

		case actionTypes.AUTH_SUCCESS:
			return authSuccess(state, payload);

		case actionTypes.AUTH_FAIL:
			return authFail(state, payload);

		case actionTypes.AUTH_LOGOUT:
			return authLogout(state, payload);

		case actionTypes.SET_AUTH_REDIRECT_PATH:
			return setAuthRedirectPath(state, payload);

		default:
			return state;
	}
};

export default reducer;
