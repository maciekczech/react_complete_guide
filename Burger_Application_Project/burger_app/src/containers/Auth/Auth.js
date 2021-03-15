import React, { Component } from 'react';
import classes from './Auth.module.css';
import axios from '././../../axios-orders';

import Input from './../../components/UI/Input/Input';
import Button from './../../components/UI/Button/Button';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from './../../store/actions/allActions';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';

import { updateObject, checkValidity } from './../../shared/utility';

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
		signUpMode: true,
	};

	componentDidMount() {
		if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
			this.props.onSetRedirectPath();
		}
	}

	inputChangedHandler = (event, controlName) => {
		const updatedControls = updateObject(this.state.controls, {
			[controlName]: updateObject(this.state.controls[controlName], {
				value: event.target.value,
				valid: checkValidity(
					event.target.value,
					this.state.controls[controlName].validationRules
				),
				touched: true,
			}),
		});

		this.setState({ controls: updatedControls });
	};

	submitHandler = (event) => {
		event.preventDefault();
		this.props.onAuth(
			this.state.controls.email.value,
			this.state.controls.password.value,
			this.state.signUpMode
		);
	};

	switchAuthModeHandler = () => {
		this.setState((prevState) => {
			return { signUpMode: !prevState.signUpMode };
		});
	};

	render() {
		const formElementsArray = [];

		for (let key in this.state.controls) {
			formElementsArray.push({
				id: key,
				config: this.state.controls[key],
			});
		}
		let form = formElementsArray.map((formElement) => (
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
		if (this.props.loading) {
			form = <Spinner />;
		}

		let errorMessage = null;
		if (this.props.error) {
			errorMessage = <p>{this.props.error.data.error.message}</p>;
		}

		let authRedirect = null;
		if (this.props.isAuthenticated) {
			authRedirect = <Redirect to={this.props.authRedirectPath} />;
		}
		return (
			<div className={classes.Auth}>
				{authRedirect}
				{errorMessage}
				<form onSubmit={this.submitHandler}>
					{form}
					<Button buttonType='Success'>SUBMIT</Button>
				</form>
				<Button
					buttonType='Danger'
					clicked={this.switchAuthModeHandler}
				>
					SWITCH TO {this.state.signUpMode ? 'SIGN IN' : 'SIGN UP'}
				</Button>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		loading: state.auth.loading,
		error: state.auth.error,
		isAuthenticated: state.auth.token !== null,
		buildingBurger: state.burgerBuilder.building,
		authRedirectPath: state.auth.authRedirectPath,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onAuth: (email, password, signUpMode) => {
			dispatch(
				actions.auth({
					email: email,
					password: password,
					signUpMode: signUpMode,
				})
			);
		},

		//calling setAuthRedirectPath from this component always resets to the main page hence hardcoded '/' value
		onSetRedirectPath: () => {
			dispatch(actions.setAuthRedirectPath('/'));
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(Auth, axios));
