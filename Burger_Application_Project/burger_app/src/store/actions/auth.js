import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START,
	};
};
export const authSuccess = (IDtoken, userID) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		payload: {
			IDtoken: IDtoken,
			userID: userID,
		},
	};
};
export const authFail = error => {
	return {
		type: actionTypes.AUTH_FAIL,
		payload: {
			error: error,
		},
	};
};

export const logout = () => {
	return {
		type: actionTypes.AUTH_LOGOUT,
	};
};

export const checkAuthTimeout = expirationTime => {
	return dispatch => {
		setTimeout(() => {
			dispatch(logout());
		}, expirationTime * 1000);
	};
};

export const auth = ({ email, password, signUpMode }) => {
	return dispatch => {
		dispatch(authStart());
		const payload = {
			email: email,
			password: password,
			returnSecureToken: true,
		};
		let url =
			'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCxO_mz8Tuk01-xjH9Dj6AKlxkCEt6WiaE';
		if (!signUpMode) {
			url =
				'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCxO_mz8Tuk01-xjH9Dj6AKlxkCEt6WiaE';
		}
		axios
			.post(url, payload)
			.then(response => {
				console.log(response);
				dispatch(
					authSuccess(response.data.idToken, response.data.localId),
				);
				dispatch(checkAuthTimeout(response.data.expiresIn));
			})
			.catch(error => {
				console.log(error.response);
				dispatch(authFail(error.response));
			});
	};
};

export const setAuthRedirectPath = path => {
	return {
		type: actionTypes.SET_AUTH_REDIRECT_PATH,
		payload: {
			path: path,
		},
	};
};
