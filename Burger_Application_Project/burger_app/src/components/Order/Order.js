import React from 'react'
import classes from './Order.module.css'

const order = (props) => {
    const ingredientsArray = Object.keys(props.ingredients)
        .map( ingredient => 
            ({ ingredient: ingredient, amount: props.ingredients[ingredient] })
        );

    const ingredientsOutput = ingredientsArray
    .map( obj => (
    <span 
        key={obj.ingredient}
        style={{
            'display': 'inline-block',
            'margin': '0 8px',
            'border': '1px solid #ccc',
            'padding': '0.3rem 0.5rem',

        }}
    >
        {obj.ingredient + ' (' + obj.amount + ') '}
    </span>
    ));

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientsOutput}</p>
            <p>Price <strong>USD {props.totalPrice}</strong></p>
            <p>Ordered By <strong>{props.customer.name}</strong></p>
        </div>
    );
}

export default order;