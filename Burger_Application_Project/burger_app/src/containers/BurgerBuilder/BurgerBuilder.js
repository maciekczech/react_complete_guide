import React, { Component } from 'react';

import { connect } from 'react-redux';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from './../../components/Burger/Burger';
import BuildControls from './../../components/Burger/BuildControls/BuildControls';
import OrderSummary from './../../components/Burger/OrderSummary/OrderSummary';
import Modal from './../../components/UI/Modal/Modal';
import Spinner from './../../components/UI/Spinner/Spinner';

import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';

import * as actionTypes from './../../store/actions/actions';

import axios from './../../axios-orders';

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 1,
	bacon: 1.2,
	meat: 3.2,
};

class BurgerBuilder extends Component {
	constructor(props) {
		super(props);
		this.state = {
			purchasing: false,
			orderLoading: false,
			error: false,
		};
	}

	componentDidMount() {
		/* 		axios
			.get('/ingredients.json')
			.then((response) => {
				console.log(response);
				this.setState({
					ingredients: response.data,
					purchasable: true,
				});
			})
			.catch((err) => {
				console.log(err);
			}); */
	}

	/* addIngredientHandler = (type) => {
		const previousCount = this.state.ingredients[type];
		const updatedIngredients = { ...this.state.ingredients };
		const newCount = previousCount + 1;
		const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
		updatedIngredients[type] = newCount;
		this.setState({
			ingredients: updatedIngredients,
			totalPrice: newPrice,
		});
		this.updatePurchaseState(updatedIngredients);
	};

	removeIngredientHandler = (type) => {
		const previousCount = this.state.ingredients[type];
		if (previousCount > 0) {
			const updatedIngredients = { ...this.state.ingredients };
			const newCount = previousCount - 1;
			const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
			updatedIngredients[type] = newCount;
			this.setState({
				ingredients: updatedIngredients,
				totalPrice: newPrice,
			});
			this.updatePurchaseState(updatedIngredients);
		}
	}; */

	isPurchasable = (ingredients) => {
		const sumOfIngredients = Object.keys(ingredients).reduce(
			(prev, current) => {
				return prev + ingredients[current];
			},
			0
		);
		return sumOfIngredients === 0 ? false : true;
	};

	purchaseHandler = () => {
		this.setState({ purchasing: true });
	};

	cancelPurchaseHandler = () => {
		this.setState({ purchasing: false });
	};

	continuePurchaseHandler = () => {
		const queryParams = [];
		for (let i in this.state.ingredients) {
			queryParams.push(
				encodeURIComponent(i) + '=' + this.state.ingredients[i]
			);
		}
		queryParams.push('price=' + this.props.totalPrice);
		const queryString = queryParams.join('&');
		this.props.history.push({
			pathname: '/checkout',
			search: '?' + queryString,
		});
	};

	render() {
		const disabledButtonsInfo = { ...this.props.ings };
		for (let key in disabledButtonsInfo) {
			disabledButtonsInfo[key] = disabledButtonsInfo[key] === 0;
		}

		let burger = <Spinner />;
		let orderSummary = null;

		if (this.props.ings) {
			burger = (
				<>
					<Burger ingredients={this.props.ings}></Burger>
					<BuildControls
						addIngredient={this.props.onIngredientAdd}
						removeIngredient={this.props.OnIngredientRemove}
						disabledButtonsInfo={disabledButtonsInfo}
						currentPrice={this.props.totalPrice}
						ordered={this.purchaseHandler}
						disableOrderButton={
							!this.isPurchasable(this.props.ings)
						}
					/>
				</>
			);
			orderSummary = (
				<OrderSummary
					ingredients={this.props.ings}
					totalPrice={this.props.totalPrice}
					cancelPurchase={this.cancelPurchaseHandler}
					continuePurchase={this.continuePurchaseHandler}
				/>
			);
		}

		if (this.state.orderLoading) {
			orderSummary = <Spinner />;
		}

		return (
			<Auxiliary>
				<Modal
					visible={this.state.purchasing}
					hideModalAndBackdrop={this.cancelPurchaseHandler}
				>
					{orderSummary}
				</Modal>
				{burger}
			</Auxiliary>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		ings: state.ingredients,
		totalPrice: state.totalPrice,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onIngredientAdd: (name) =>
			dispatch({
				type: actionTypes.ADD_INGREDIENT,
				payload: { ingredientName: name },
			}),
		OnIngredientRemove: (name) =>
			dispatch({
				type: actionTypes.REMOVE_INGREDIENT,
				payload: { ingredientName: name },
			}),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
