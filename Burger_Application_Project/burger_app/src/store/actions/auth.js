import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START,
	};
};
export const authSuccess = ({ authData }) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		payload: {
			authData: authData,
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

export const auth = ({ email, password }) => {
	return (dispatch) => {
		dispatch(authStart());
		const payload = {
			email: email,
			password: password,
			returnSecureToken: true,
		};
		axios
			.post(
				'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCxO_mz8Tuk01-xjH9Dj6AKlxkCEt6WiaE',
				payload
			)
			.then((response) => {
				console.log(response);
				dispatch(authSuccess(response));
			})
			.catch((error) => {
				console.log(error);
				dispatch(authFail(error));
			});
	};
};
