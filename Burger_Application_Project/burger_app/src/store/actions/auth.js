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
export const authFail = (error) => {
	return {
		type: actionTypes.AUTH_FAIL,
		payload: {
			error: error,
		},
	};
};

export const logout = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('expirationDate');
	localStorage.removeItem('userID');
	return {
		type: actionTypes.AUTH_LOGOUT,
	};
};

export const checkAuthTimeout = (expirationTime) => {
	return (dispatch) => {
		setTimeout(() => {
			dispatch(logout());
		}, expirationTime * 1000);
	};
};

export const auth = ({ email, password, signUpMode }) => {
	return (dispatch) => {
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
			.then((response) => {
				const expirationDate = new Date(
					new Date().getTime() + response.data.expiresIn * 1000
				);
				localStorage.setItem('token', response.data.idToken);
				localStorage.setItem('expirationDate', expirationDate);
				localStorage.setItem('userID', response.data.localId);
				dispatch(
					authSuccess(response.data.idToken, response.data.localId)
				);
				dispatch(checkAuthTimeout(response.data.expiresIn));
			})
			.catch((error) => {
				dispatch(authFail(error.response));
			});
	};
};

export const setAuthRedirectPath = (path) => {
	return {
		type: actionTypes.SET_AUTH_REDIRECT_PATH,
		payload: {
			path: path,
		},
	};
};

export const authCheckState = () => {
	return (dispatch) => {
		const token = localStorage.getItem('token');
		if (!token) {
			dispatch(logout());
		} else {
			const expirationDate = new Date(
				localStorage.getItem('expirationDate')
			);
			const userID = localStorage.getItem('userID');
			if (new Date() < expirationDate) {
				dispatch(authSuccess(token, userID));
				dispatch(
					checkAuthTimeout(
						Math.abs(
							(expirationDate.getTime() - new Date().getTime()) /
								1000
						)
					)
				);
			} else {
				dispatch(logout());
			}
		}
	};
};
