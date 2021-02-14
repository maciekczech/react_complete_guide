import * as actionTypes from './actionTypes';
import axios from './../../axios-orders';

export const addIngredient = payload => {
	return {
		type: actionTypes.ADD_INGREDIENT,
		payload: { ...payload },
	};
};
export const removeIngredient = payload => {
	return {
		type: actionTypes.REMOVE_INGREDIENT,
		payload: { ...payload },
	};
};

export const setIngredients = payload => {
	return {
		type: actionTypes.SET_INITIAL_INGREDIENTS,
		payload: { ...payload },
	};
};

export const setError = payload => {
	return {
		type: actionTypes.SET_ERROR,
		payload: { ...payload },
	};
};

export const setInitialIngredients = () => {
	return dispatch => {
		axios
			.get('/ingredients.json')
			.then(response => {
				console.log(response);
				dispatch(setIngredients({ ingredients: response.data }));
			})
			.catch(err => {
				dispatch(setError());
			});
	};
};
