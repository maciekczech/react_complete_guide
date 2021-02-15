import * as actionTypes from './../actions/actionTypes';

const initialState = {
	orders: [],
	loading: false,
	error: null,
};

const reducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case actionTypes.PURCHASE_BURGER_SUCCESS:
			const newOrder = { id: payload.id, orderData: payload.orderData };
			return {
				...state,
				loading: false,
				orders: state.orders.concat(newOrder),
			};
		case actionTypes.PURCHASE_BURGER_FAILED:
			return {
				...state,
				error: payload.error,
				loading: false,
			};
		case actionTypes.PURCHASE_BURGER_START:
			return {
				...state,
				loading: true,
			};

		default:
			return state;
	}
};

export default reducer;
