import React, { Component } from 'react';
import classes from './Auth.module.css';

import Input from './../../components/UI/Input/Input';
import Button from './../../components/UI/Button/Button';

import { connect } from 'react-redux';

import * as actions from './../../store/actions/allActions';

class Auth extends Component {
	state = {
		controls: {
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Email Address',
					name: 'email',
				},
				value: '',
				validationRules: {
					required: true,
				},
				valid: false,
				touched: false,
			},
			password: {
				elementType: 'input',
				elementConfig: {
					type: 'password',
					placeholder: 'Password',
					name: 'password',
				},
				value: '',
				validationRules: {
					required: true,
					minLength: 7,
				},
				valid: false,
				touched: false,
			},
		},
	};

	checkValidity(value, rules) {
		//to prevent a common validation mistake we initialy set our result to true and then check for the consecutive rules making sure that we take our previous results into consideration.
		//Sounds confusing but it comes down to checking whether the previous result was also true
		//by putting && between current and previous result we can cascade a 'false' result down the if statements
		let isValid = true;

		if (rules.required) {
			isValid = value.trim() !== '' && isValid;
		}
		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}
		if (rules.maxLength) {
			isValid = value.length <= rules.maxLength && isValid;
		}

		return isValid;
	}

	inputChangedHandler = (event, controlName) => {
		const updatedControls = {
			...this.state.controls,
			[controlName]: {
				...this.state.controls[controlName],
				value: event.target.value,
				valid: this.checkValidity(
					event.target.value,
					this.state.controls[controlName].validationRules
				),
				touched: true,
			},
		};
		this.setState({ controls: updatedControls });
	};

	submitHandler = (event) => {
		event.preventDefault();
		this.props.onAuth(
			this.state.controls.email.value,
			this.state.controls.password.value
		);
	};

	render() {
		const formElementsArray = [];
		for (let key in this.state.controls) {
			formElementsArray.push({
				id: key,
				config: this.state.controls[key],
			});
		}
		const form = formElementsArray.map((formElement) => (
			<Input
				key={formElement.id}
				formIdentifier={formElement.id}
				valid={formElement.config.valid}
				touched={formElement.config.touched}
				shouldValidate={formElement.config.validationRules}
				elementType={formElement.config.elementType}
				elementConfig={formElement.config.elementConfig}
				value={formElement.config.value}
				changed={(event) =>
					this.inputChangedHandler(event, formElement.id)
				}
			></Input>
		));
		return (
			<div className={classes.Auth}>
				<form onSubmit={this.submitHandler}>
					{form}
					<Button buttonType='Success'>SUBMIT</Button>
				</form>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onAuth: (email, password) => {
			dispatch(actions.auth({ email: email, password: password }));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
