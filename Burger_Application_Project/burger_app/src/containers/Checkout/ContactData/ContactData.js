import React, { Component } from 'react'
import Button from './../../../components/UI/Button/Button';
import classes from './ContactData.module.css'

import axios from './../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

export default class ContactData extends Component {
    state={
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: '',
        },
        loading: false
    }

    orderButtonHandler = (event) => {
        event.preventDefault();
        const currentOrder = {ingredients: {}, totalPrice: 0, contactData: {}};
        currentOrder.ingredients = this.props.ingredients;
        currentOrder.totalPrice = this.props.totalPrice; 
        console.log('we\'re in Contact data');
        console.log(currentOrder.ingredients);
        console.log(event);

        const order = {
            ingredients: currentOrder.ingredients,
            price: currentOrder.totalPrice,
            customer: {
                name: 'Maciej Czech',
                address: {
                    street: 'Mickiewicza',
                    no: '53/58',
                    city: 'Lezajsk'
                },
                email: 'czechmaciej66@gmail.com'
            },
        };

        this.setState({ loading: true});

        axios.post('/orders.json', order)
        .then(response => {
            this.setState({ loading: false});
            this.props.history.push('/');
        })
        .catch(error => {
            this.setState({error: error});
            console.log(error);
        }); 
    }
    
    render() {
        let form = (
            <form>
                <input className={classes.Input} type='text' name='name' placeholder='Your Name' />
                <input className={classes.Input} type='text' name='email' placeholder='Your Email' />
                <input className={classes.Input} type='text' name='street' placeholder='Your Street' />
                <input className={classes.Input} type='text' name='postalCode' placeholder='Your Postal Code' />
                <Button buttonType='Success' clicked={this.orderButtonHandler}> ORDER </Button>
            </form> 
        );

        if(this.state.loading){
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        )
    }
}
