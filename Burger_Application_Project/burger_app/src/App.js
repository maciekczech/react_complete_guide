import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import asyncComponent from './hoc/asyncComponent/asyncComponent';

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';

import * as actions from './store/actions/allActions';

const asyncCheckout = asyncComponent(() => {
	return import('./containers/Checkout/Checkout');
});

const asyncOrders = asyncComponent(() => {
	return import('./containers/Orders/Orders');
});

const asyncAuth = asyncComponent(() => {
	return import('./containers/Auth/Auth');
});

class App extends Component {
	componentDidMount() {
		this.props.onReloadAuthStateCheck();
	}

	render() {
		let routes = (
			<>
				<Route path='/auth' component={asyncAuth} />
				<Route path='/' exact component={BurgerBuilder} />
				<Redirect to='/' />
			</>
		);

		if (this.props.isAuthenticated) {
			routes = (
				<>
					<Route path='/logout' component={Logout} />
					<Route path='/checkout' component={asyncCheckout} />
					<Route path='/orders' component={asyncOrders} />
					<Route path='/auth' component={asyncAuth} />
					<Route path='/' exact component={BurgerBuilder} />
					<Redirect to='/' />
				</>
			);
		}
		return (
			<BrowserRouter>
				<Layout>
					<Switch>{routes}</Switch>
				</Layout>
			</BrowserRouter>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.token !== null,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onReloadAuthStateCheck: () => {
			dispatch(actions.authCheckState());
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
