import axios from './../../axios-orders';
import React, { Component } from 'react';
import Order from './../../components/Order/Order';
import Spinner from './../../components//UI/Spinner/Spinner';

export default class Orders extends Component {
	state = {
		loadingOrders: false,
		orders: [],
	};

	componentDidMount() {
		this.setState({ loadingOrders: true });
		axios
			.get('/orders.json')
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
				this.setState({ orders: orders, loadingOrders: false });
			})
			.catch(error => {
				this.setState({ loadingOrders: false });
				console.log(error);
			});
	}

	render() {
		let orders = null;
		if (this.state.loadingOrders) {
			orders = <Spinner />;
		} else {
			orders = this.state.orders.map(order => (
				<Order
					key={order.id}
					ingredients={order.ingredients}
					customer={order.customer}
					totalPrice={order.totalPrice}></Order>
			));
		}

		return <div>{orders}</div>;
	}
}
