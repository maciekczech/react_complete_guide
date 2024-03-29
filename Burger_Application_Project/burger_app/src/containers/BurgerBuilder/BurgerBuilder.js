import React, { Component } from 'react';

import { connect } from 'react-redux';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from './../../components/Burger/Burger';
import BuildControls from './../../components/Burger/BuildControls/BuildControls';
import OrderSummary from './../../components/Burger/OrderSummary/OrderSummary';
import Modal from './../../components/UI/Modal/Modal';
import Spinner from './../../components/UI/Spinner/Spinner';

import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';

import * as allActions from '../../store/actions/allActions';

import axios from './../../axios-orders';

class BurgerBuilder extends Component {
	constructor(props) {
		super(props);
		this.state = {
			purchasing: false,
		};
	}

	componentDidMount() {
		this.props.onSettingInitialIngredients();
	}

	isPurchasable = ingredients => {
		const sumOfIngredients = Object.keys(ingredients).reduce(
			(prev, current) => {
				return prev + ingredients[current];
			},
			0,
		);
		return sumOfIngredients === 0 ? false : true;
	};

	purchaseHandler = () => {
		if (this.props.isAuthenticated) {
			this.setState({ purchasing: true });
		} else {
			//this will be the next page user is redirected after authenticating
			this.props.onSetRedirectPath('/checkout');
			this.props.history.push('/auth');
		}
	};

	cancelPurchaseHandler = () => {
		this.setState({ purchasing: false });
	};

	continuePurchaseHandler = () => {
		this.props.onInitPurchase();
		this.props.history.push('/checkout');
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
						removeIngredient={this.props.onIngredientRemove}
						disabledButtonsInfo={disabledButtonsInfo}
						currentPrice={this.props.totalPrice}
						ordered={this.purchaseHandler}
						isAuthenticated={this.props.isAuthenticated}
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

		return (
			<Auxiliary>
				<Modal
					visible={this.state.purchasing}
					hideModalAndBackdrop={this.cancelPurchaseHandler}>
					{orderSummary}
				</Modal>
				{burger}
			</Auxiliary>
		);
	}
}

const mapStateToProps = state => {
	return {
		ings: state.burgerBuilder.ingredients,
		totalPrice: state.burgerBuilder.totalPrice,
		isAuthenticated: state.auth.token !== null,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onIngredientAdd: name =>
			dispatch(allActions.addIngredient({ ingredientName: name })),

		onIngredientRemove: name =>
			dispatch(allActions.removeIngredient({ ingredientName: name })),

		onSettingInitialIngredients: () =>
			dispatch(allActions.setInitialIngredients()),

		onInitPurchase: () => dispatch(allActions.purchaseInit()),

		onSetRedirectPath: path => {
			dispatch(allActions.setAuthRedirectPath(path));
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(withErrorHandler(BurgerBuilder, axios));
