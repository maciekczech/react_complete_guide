import React, {Component} from 'react'
import Auxiliary from './../../hoc/Auxiliary'
import Toolbar from './../Navigation/Toolbar/Toolbar'
import classes from './Layout.module.css'
import SideDrawer from './../Navigation/SideDrawer/SideDrawer'

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => { 
            return {showSideDrawer: !prevState.showSideDrawer} });
    }

    render(){
        return (
            <Auxiliary>
                <SideDrawer visible={this.state.showSideDrawer} hide={this.sideDrawerClosedHandler}/>
                <Toolbar toggleSideDrawer={this.sideDrawerToggleHandler}/>
                <main className={classes.Content}> {this.props.children}  </main>
            </Auxiliary>
        );
    }
}


export default Layout;