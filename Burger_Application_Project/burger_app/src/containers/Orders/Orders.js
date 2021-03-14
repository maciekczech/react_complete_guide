import React, { Component } from 'react';
import Order from './../../components/Order/Order';
import Spinner from './../../components//UI/Spinner/Spinner';

import { fetchOrders, fetchInit } from './../../store/actions/allActions';
import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';
import axios from './../../axios-orders';

import { connect } from 'react-redux';

class Orders extends Component {
	componentDidMount() {
		this.props.onOrderFetch(this.props.token, this.props.userID);
	}

	componentWillMount() {
		this.props.onFetchInit();
	}

	render() {
		let orders = <Spinner />;
		if (!this.props.loading) {
			orders = this.props.orders.map(order => (
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

const mapStateToProps = state => {
	return {
		orders: state.order.orders,
		loading: state.order.loading,
		token: state.auth.token,
		userID: state.auth.userID,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onOrderFetch: (token, userID) => dispatch(fetchOrders(token, userID)),
		onFetchInit: () => dispatch(fetchInit()),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(withErrorHandler(Orders, axios));
