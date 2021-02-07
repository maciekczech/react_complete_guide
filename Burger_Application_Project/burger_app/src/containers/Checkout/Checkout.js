import React, { Component } from 'react';

import { Route } from 'react-router-dom';

import CheckoutSummary from './../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

export default class Checkout extends Component {
	state = {
		ingredients: null,
		totalPrice: null,
	};

	checkoutContinued = () => {
		this.props.history.push('checkout/contact-data');
	};

	checkoutCancelled = () => {
		this.props.history.goBack();
	};

	componentWillMount() {
		const ingredients = {};
		let totalPrice = null;
		const query = new URLSearchParams(this.props.location.search);
		for (let [name, value] of query.entries()) {
			if (name !== 'price') {
				ingredients[name] = parseInt(value);
			} else {
				totalPrice = parseFloat(value).toFixed(2);
			}
		}
		this.setState({ ingredients: ingredients, totalPrice: totalPrice });
	}

	render() {
		return (
			<div>
				<CheckoutSummary
					ingredients={this.state.ingredients}
					checkoutContinued={this.checkoutContinued}
					checkoutCancelled={
						this.checkoutCancelled
					}></CheckoutSummary>

				{/* rendering the component allows to easily pass the props */}
				<Route
					path={this.props.match.url + '/contact-data'}
					render={props => {
						return (
							<ContactData
								ingredients={this.state.ingredients}
								totalPrice={this.state.totalPrice}
								{...props}
							/>
						);
					}}
				/>
			</div>
		);
	}
}
