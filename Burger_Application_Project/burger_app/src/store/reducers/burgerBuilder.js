import * as actionTypes from '../actions/actionTypes';
import { updateObject } from './../utility';

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 1,
	bacon: 1.2,
	meat: 3.2,
};

const initialState = {
	ingredients: null,
	totalPrice: 4,
	error: false,
	//building bool indicates whether the burger is being built at the moment. It make is easy to determine whether app should save current ingredients upon redirection of unauthencticated user to the sing up page.
	building: false,
};

const calculateNewPrice = ingredients => {
	let price = 0;
	for (let key in ingredients) {
		price += +(ingredients[key] * INGREDIENT_PRICES[key]).toFixed(2);
	}
	return +price.toFixed(2);
};

const addIngredient = (state, payload) => {
	const updatedIngredient = {
		[payload.ingredientName]: state.ingredients[payload.ingredientName] + 1,
	};
	const updatedIngredients = updateObject(
		state.ingredients,
		updatedIngredient,
	);
	const updatedState = {
		ingredients: updatedIngredients,
		totalPrice: (state.totalPrice +=
			INGREDIENT_PRICES[payload.ingredientName]),
		building: true,
	};

	return updateObject(state, updatedState);
};

const removeIngredient = (state, payload) => {
	const updatedIngredient = {
		[payload.ingredientName]: state.ingredients[payload.ingredientName] - 1,
	};
	const updatedIngredients = updateObject(
		state.ingredients,
		updatedIngredient,
	);
	const updatedState = {
		ingredients: updatedIngredients,
		totalPrice: (state.totalPrice -=
			INGREDIENT_PRICES[payload.ingredientName]),
		building: true,
	};

	return updateObject(state, updatedState);
};

const setInitialIngredients = (state, payload) => {
	const updatedState = updateObject(state, {
		ingredients: {
			...payload.ingredients,
		},
		totalPrice:
			initialState.totalPrice + calculateNewPrice(payload.ingredients),
		error: false,
		building: false,
	});

	return updateObject(state, updatedState);
};

const fetchIngredientsFailed = state => {
	return updateObject(state, { error: true });
};

const reducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case actionTypes.ADD_INGREDIENT:
			return addIngredient(state, payload);

		case actionTypes.REMOVE_INGREDIENT:
			return removeIngredient(state, payload);

		case actionTypes.SET_INITIAL_INGREDIENTS:
			return setInitialIngredients(state, payload);

		case actionTypes.FETCH_INGREDIENTS_FAILED:
			return fetchIngredientsFailed(state);

		default:
			return state;
	}
};

export default reducer;
