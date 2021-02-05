import React from 'react'
import classes from './Order.module.css'

const order = () => {
    return (
        <div className={classes.Order}>
            <p>Ingredients: Salad (1)</p>
            <p>Price <strong>USD 12.50</strong></p>
        </div>
    );
}

export default order;