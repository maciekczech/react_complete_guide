import * as actionTypes from './../actions/actionTypes';
import { updateObject } from './../../shared/utility';

const initialState = {
	orders: [],
	loading: false,
	error: null,
	purchased: false,
};

const purchaseBurgerSuccess = (state, payload) => {
	const updatedStateSuccess = {
		loading: false,
		purchased: true,
	};
	return updateObject(state, updatedStateSuccess);
};

const purchaseBurgerFailed = (state, payload) => {
	const updatedStateFailed = {
		error: payload.error,
		loading: false,
	};
	return updateObject(state, updatedStateFailed);
};

const fetchOrderSuccess = (state, payload) => {
	return updateObject(state, {
		loading: false,
		orders: payload.orders,
	});
};

const fetchOrderFailed = (state, payload) => {
	return updateObject(state, {
		loading: false,
		error: payload.error,
	});
};

const reducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case actionTypes.PURCHASE_BURGER_SUCCESS:
			return purchaseBurgerSuccess(state, payload);

		case actionTypes.PURCHASE_BURGER_FAILED:
			return purchaseBurgerFailed(state, payload);

		case actionTypes.PURCHASE_BURGER_START:
			return updateObject(state, { loading: true });

		case actionTypes.PURCHASE_INIT:
			return updateObject(state, { purchased: false });

		case actionTypes.FETCH_INIT:
			return updateObject(state, { loading: false });

		case actionTypes.FETCH_ORDERS_START:
			return updateObject(state, { loading: true });

		case actionTypes.FETCH_ORDERS_SUCCESS:
			return fetchOrderSuccess(state, payload);

		case actionTypes.FETCH_ORDERS_FAILED:
			return fetchOrderFailed(state, payload);

		default:
			return state;
	}
};

export default reducer;
