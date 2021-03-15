import React, { Component } from 'react';
import Button from './../../../components/UI/Button/Button';
import classes from './ContactData.module.css';

import { updateObject, checkValidity } from './../../../shared/utility';

import { connect } from 'react-redux';

import axios from './../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from './../../../components/UI/Input/Input';

import withErrorHandler from './../../../hoc/withErrorHandler/withErrorHandler';

import { purchaseBurger } from './../../../store/actions/allActions';

class ContactData extends Component {
	state = {
		orderForm: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Name',
					name: 'name',
				},
				value: '',
				validationRules: {
					required: true,
				},
				valid: false,
				touched: false,
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Street',
					name: 'street',
				},
				value: '',
				validationRules: {
					required: true,
				},
				valid: false,
				touched: false,
			},
			postalCode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Postal Code',
					name: 'postal code',
				},
				value: '',
				validationRules: {
					required: true,
					maxLength: 5,
					minLength: 5,
				},
				valid: false,
				touched: false,
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Country',
					name: 'country',
				},
				value: '',
				validationRules: {
					required: true,
				},
				valid: false,
				touched: false,
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Your Email',
					name: 'email',
				},
				value: '',
				validationRules: {
					required: true,
				},
				valid: false,
				touched: false,
			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
						{ value: 'fastest', displayValue: 'Fastest' },
						{ value: 'cheapest', displayValue: 'Cheapest' },
					],
				},
				value: 'fastest',
				validationRules: {},
				valid: true,
				touched: false,
			},
		},
		formIsValid: false,
	};

	orderButtonHandler = (event) => {
		event.preventDefault();
		const formContactData = {};
		for (let inputIdentifiers in this.state.orderForm) {
			formContactData[inputIdentifiers] = this.state.orderForm[
				inputIdentifiers
			].value;
		}

		const currentOrder = {
			ingredients: this.props.ings,
			totalPrice: (
				Math.round((this.props.price + Number.EPSILON) * 100) / 100
			).toFixed(2),
			contactData: formContactData,
			userID: this.props.userID,
		};
		this.props.onBurgerOrder(currentOrder, this.props.token);
	};

	inputChangedHandler = (event, identifier) => {
		const updatedFormElement = updateObject(
			this.state.orderForm[identifier],
			{
				value: event.target.value,
				valid: checkValidity(
					event.target.value,
					this.state.orderForm[identifier].validationRules
				),
				touched: true,
			}
		);

		const updatedOrderForm = updateObject(this.state.orderForm, {
			[identifier]: updatedFormElement,
		});

		let formIsValid = true;
		for (let inputIdentifiers in updatedOrderForm) {
			formIsValid =
				updatedOrderForm[inputIdentifiers].valid && formIsValid;
		}
		this.setState({
			orderForm: updatedOrderForm,
			formIsValid: formIsValid,
		});
	};

	render() {
		let formInputs = [];
		for (let key in this.state.orderForm) {
			formInputs.push(
				<Input
					key={key}
					formIdentifier={key}
					valid={this.state.orderForm[key].valid}
					touched={this.state.orderForm[key].touched}
					shouldValidate={this.state.orderForm[key].validationRules}
					elementType={this.state.orderForm[key].elementType}
					elementConfig={this.state.orderForm[key].elementConfig}
					value={this.state.orderForm[key].value}
					changed={(event) => this.inputChangedHandler(event, key)}
				/>
			);
		}

		if (this.props.loading) {
			formInputs = <Spinner />;
		}
		return (
			<div className={classes.ContactData}>
				<h4>Enter your contact data</h4>
				<form onSubmit={this.orderButtonHandler}>
					{formInputs}
					<Button
						buttonType='Success'
						disabled={!this.state.formIsValid}
					>
						{' '}
						ORDER{' '}
					</Button>
				</form>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		loading: state.order.loading,
		token: state.auth.token,
		userID: state.auth.userID,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onBurgerOrder: (currentOrder, token) =>
			dispatch(purchaseBurger({ currentOrder: currentOrder }, token)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(ContactData, axios));
