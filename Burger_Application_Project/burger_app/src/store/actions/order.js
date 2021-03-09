import * as actionTypes from './actionTypes';
import axios from './../../axios-orders';

export const purchaseInit = () => {
	return {
		type: actionTypes.PURCHASE_INIT,
	};
};

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

export const purchaseBurger = (payload, token) => {
	return dispatch => {
		dispatch(purchaseBurgerStart());
		axios
			.post('/orders.json?auth=' + token, payload.currentOrder)
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

export const fetchInit = () => {
	return {
		type: actionTypes.FETCH_INIT,
	};
};

export const fetchOrdersStart = () => {
	return {
		type: actionTypes.FETCH_ORDERS_START,
	};
};

export const fetchOrdersSuccess = payload => {
	return {
		type: actionTypes.FETCH_ORDERS_SUCCESS,
		payload: payload,
	};
};

export const fetchOrdersFailed = payload => {
	return {
		type: actionTypes.FETCH_ORDERS_FAILED,
		payload: payload,
	};
};

export const fetchOrders = token => {
	return dispatch => {
		dispatch(fetchOrdersStart());
		axios
			.get('/orders.json?auth=' + token)
			.then(response => {
				console.log(response);
				const orders = [];
				Object.keys(response.data).forEach(orderID => {
					let order = {
						id: null,
						ingredients: {},
						totalPrice: 0,
					};
					order.id = orderID;
					order.customer = { ...response.data[orderID].contactData };
					order.ingredients = {
						...response.data[orderID].ingredients,
					};
					order.totalPrice = response.data[orderID].totalPrice;
					orders.push(order);
				});
				dispatch(fetchOrdersSuccess({ orders: orders }));
			})
			.catch(error => {
				dispatch(fetchOrdersFailed({ error: error }));
			});
	};
};
