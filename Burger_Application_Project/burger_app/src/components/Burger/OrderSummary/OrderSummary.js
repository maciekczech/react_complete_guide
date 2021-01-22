import React from 'react';
import classes from './OrderSummary.module.css';
import Button from './../../UI/Button/Button';


const orderSummary = props => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map( ingredientKey => {
            return (
            <li key={ingredientKey}>
                <span 
                    style={{testTransform: 'capitalize'}}
                > 
                    {ingredientKey}
                </span> 
                : {props.ingredients[ingredientKey]} 
            </li>
            );
        });
    return (
        <>
            <h3> Your Order </h3>
            <p> A delicious burger with the following ingredients</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p> <strong> Total Price: {props.totalPrice}</strong> </p>
            <p> Continue with checkout! </p>
            <Button clicked={props.cancelPurchase} buttonType='Danger'> Cancel </Button>
            <Button clicked={props.continuePurchase} buttonType='Success'> Continue </Button>
        </>
    );
};

export default orderSummary;