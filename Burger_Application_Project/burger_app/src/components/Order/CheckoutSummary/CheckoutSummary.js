import {React, useState, useEffect} from 'react'
import Burger from './../../Burger/Burger';
import axios from './../../../axios-orders';
import Button from './../../UI/Button/Button';

const CheckoutSummary = (props) => {
    const [mockIngredients, setMockIngredients] = useState({});

    useEffect(() => {
        axios.get('/ingredients.json').then(response => {
            setMockIngredients(response.data);
        }).catch(err => {
            console.log(err);
        });
    }, []);
    
    return (
        <div style={{ 'textAlign': 'center' }}>
            
            <h1>We hope it tastes well!</h1>
            <div>
                {props.ingredients ? <Burger
                    ingredients={props.ingredients}
                    style={{ 'width': '100%', 'margin': 'auto' }} /> : null}
                
            </div>
            <Button buttonType='Danger'  clicked={props.checkoutCancelled}> Cancel </Button>
            <Button buttonType='Success' clicked={props.checkoutContinued}> Continue </Button>
            
        </div>
    )
};

export default CheckoutSummary;