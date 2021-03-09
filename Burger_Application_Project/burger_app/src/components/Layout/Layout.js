import React, { Component } from 'react';
import Auxiliary from './../../hoc/Auxiliary/Auxiliary';
import Toolbar from './../Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css';
import SideDrawer from './../Navigation/SideDrawer/SideDrawer';

import { connect } from 'react-redux';

class Layout extends Component {
	state = {
		showSideDrawer: false,
	};

	sideDrawerClosedHandler = () => {
		this.setState({ showSideDrawer: false });
	};

	sideDrawerToggleHandler = () => {
		this.setState(prevState => {
			return { showSideDrawer: !prevState.showSideDrawer };
		});
	};

	render() {
		return (
			<Auxiliary>
				<SideDrawer
					isAuthenticated={this.props.isAuthenticated}
					visible={this.state.showSideDrawer}
					hide={this.sideDrawerClosedHandler}
				/>
				<Toolbar
					isAuthenticated={this.props.isAuthenticated}
					toggleSideDrawer={this.sideDrawerToggleHandler}
				/>
				<main className={classes.Content}> {this.props.children} </main>
			</Auxiliary>
		);
	}
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token !== null,
	};
};

export default connect(mapStateToProps)(Layout);
