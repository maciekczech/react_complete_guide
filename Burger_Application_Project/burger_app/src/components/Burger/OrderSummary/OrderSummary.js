import React, {Component} from 'react';
import Button from './../../UI/Button/Button';


class OrderSummary extends Component {

    componentDidUpdate(){
        console.log("OrderSummary [componentDidUpdate]");
    }

    render(){
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(ingredientKey => {
                return (
                    <li key={ingredientKey}>
                        <span
                            style={{ testTransform: 'capitalize' }}
                        >
                            {ingredientKey}
                        </span>
                : {this.props.ingredients[ingredientKey]}
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
            <p> <strong> Total Price: {this.props.totalPrice}</strong> </p>
            <p> Continue with checkout! </p>
            <Button clicked={this.props.cancelPurchase} buttonType='Danger'> Cancel </Button>
            <Button clicked={this.props.continuePurchase} buttonType='Success'> Continue </Button>
        </>
        );
    };
};

export default OrderSummary;