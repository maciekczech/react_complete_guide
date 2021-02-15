import * as actionTypes from './actionTypes';
import axios from './../../axios-orders';

const purchaseBurgerSuccess = ({ id, orderData }) => {
	return {
		type: actionTypes.PURCHASE_BURGER_SUCCESS,
		payload: {
			orderData: orderData,
			id: id,
		},
	};
};

const purchaseBurgerFailed = payload => {
	return {
		type: actionTypes.PURCHASE_BURGER_FAILED,
		payload: { ...payload },
	};
};

export const purchaseBurgerStart = () => {
	return {
		type: actionTypes.PURCHASE_BURGER_START,
	};
};

export const purchaseBurger = payload => {
	return dispatch => {
		dispatch(purchaseBurgerStart());
		axios
			.post('/orders.json', payload.currentOrder)
			.then(response => {
				dispatch(
					purchaseBurgerSuccess({
						id: response.data.name,
						orderData: payload.currentOrder,
					}),
				);
			})
			.catch(error => {
				dispatch(purchaseBurgerFailed({ error: error }));
				console.log(error);
			});
	};
};
