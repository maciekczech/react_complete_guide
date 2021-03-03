import * as actionTypes from './../actions/actionTypes';

const initialState = {
	orders: [],
	loading: false,
	error: null,
	purchased: false,
};

const reducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case actionTypes.PURCHASE_BURGER_SUCCESS:
			const newOrder = { id: payload.id, orderData: payload.orderData };
			return {
				...state,
				loading: false,
				purchased: true,
				//orders: state.orders.concat(newOrder),
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

		case actionTypes.PURCHASE_INIT:
			return {
				...state,
				purchased: false,
			};

		case actionTypes.FETCH_INIT:
			return {
				...state,
				loading: false,
			};

		case actionTypes.FETCH_ORDERS_START:
			return {
				...state,
				loading: true,
			};
		case actionTypes.FETCH_ORDERS_SUCCESS:
			return {
				...state,
				loading: false,
				orders: payload.orders,
			};
		case actionTypes.FETCH_ORDERS_FAILED:
			return {
				...state,
				loading: false,
				error: payload.error,
			};

		default:
			return state;
	}
};

export default reducer;
