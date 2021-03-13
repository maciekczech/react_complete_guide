import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';

import * as actions from './store/actions/allActions';

class App extends Component {
	componentDidMount() {
		this.props.onReloadAuthStateCheck();
	}

	render() {
		let routes = (
			<>
				<Route path="/auth" component={Auth} />
				<Route path="/" exact component={BurgerBuilder} />
				<Redirect to="/" />
			</>
		);

		if (this.props.isAuthenticated) {
			routes = (
				<>
					<Route path="/logout" component={Logout} />
					<Route path="/checkout" component={Checkout} />
					<Route path="/orders" component={Orders} />
					<Route path="/" exact component={BurgerBuilder} />
					<Redirect to="/" />
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

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token !== null,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onReloadAuthStateCheck: () => {
			dispatch(actions.authCheckState());
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
