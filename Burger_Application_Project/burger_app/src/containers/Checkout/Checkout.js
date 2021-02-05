import React, { Component } from 'react'

import {Route} from 'react-router-dom';

import CheckoutSummary from './../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

export default class Checkout extends Component {
    
    state = {
        ingredients: null,
        totalPrice: null,
    }
    
    checkoutContinued = () => {
        this.props.history.push('checkout/contact-data');
    }

    checkoutCancelled = () => {
        this.props.history.goBack();
    }

    componentDidMount(){
        const ingredients = {}
        let totalPrice = null;
        const query = new URLSearchParams(this.props.location.search);
        for(let [name, value] of query.entries()){
            console.log(name);
            if(name !== 'price'){
                ingredients[name] = value;
            }else{
                totalPrice = value;
            }
        }
        this.setState({ingredients: ingredients, totalPrice: totalPrice});
    }

    render() {

        return (
            <div>
                <CheckoutSummary
                ingredients={this.state.ingredients}
                checkoutContinued={this.checkoutContinued}
                checkoutCancelled={this.checkoutCancelled}
                >
                </CheckoutSummary>

                {/* rendering the component allows to easily pass the props */}
                <Route 
                path={this.props.match.url + '/contact-data'}
                render={(props) => { 
                    return <ContactData 
                        ingredients={this.state.ingredients} 
                        price={this.state.totalPrice}
                        {...props}
                        /> 
                    }} 
                />

            </div>
        )
    }
}

