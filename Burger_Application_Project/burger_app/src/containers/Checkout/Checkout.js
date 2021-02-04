import React, { Component } from 'react'

import {Route} from 'react-router-dom';

import CheckoutSummary from './../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

export default class Checkout extends Component {
    
    state = {
        ingredients: null,
    }
    
    checkoutContinued = () => {
        this.props.history.push('checkout/contact-data');
    }

    checkoutCancelled = () => {
        this.props.history.goBack();
    }

    componentDidMount(){
        console.log(this.props.location.search);
        const ingredients = {}
        const query = new URLSearchParams('?bacon=0&cheese=2&meat=2&salad=1');
        for(let [name, value] of query.entries()){
            ingredients[name]=value;
        }
        this.setState({ingredients: ingredients})
    }

    render() {

        return (
            <div>
                <CheckoutSummary
                ingredients={null}
                checkoutContinued={this.checkoutContinued}
                checkoutCancelled={this.checkoutCancelled}
                >
                </CheckoutSummary>

                <Route path={this.props.match.url + '/contact-data'} component={ContactData}/>

            </div>
        )
    }
}

