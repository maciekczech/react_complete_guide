import * as actionTypes from '../actions/actionTypes';

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
};

const calculateNewPrice = ingredients => {
	let price = 0;
	for (let key in ingredients) {
		price += +(ingredients[key] * INGREDIENT_PRICES[key]).toFixed(2);
	}
	return +price.toFixed(2);
};

const reducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case actionTypes.ADD_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[payload.ingredientName]:
						state.ingredients[payload.ingredientName] + 1,
				},
				totalPrice: (state.totalPrice +=
					INGREDIENT_PRICES[payload.ingredientName]),
			};
		case actionTypes.REMOVE_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[payload.ingredientName]:
						state.ingredients[payload.ingredientName] - 1,
				},
				totalPrice: (state.totalPrice -=
					INGREDIENT_PRICES[payload.ingredientName]),
			};
		case actionTypes.SET_INITIAL_INGREDIENTS:
			return {
				...state,
				ingredients: {
					...payload.ingredients,
				},
				totalPrice:
					initialState.totalPrice +
					calculateNewPrice(payload.ingredients),
				error: false,
			};
		case actionTypes.SET_ERROR:
			return {
				...state,
				error: true,
			};

		default:
			return state;
	}
};

export default reducer;
