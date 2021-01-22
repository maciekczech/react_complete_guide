import React, {Component} from 'react';
import Auxiliary from './../../hoc/Auxiliary';
import Burger from './../../components/Burger/Burger';
import BuildControls from './../../components/Burger/BuildControls/BuildControls';
import OrderSummary from './../../components/Burger/OrderSummary/OrderSummary';
import Modal from './../../components/UI/Modal/Modal'


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 1,
    bacon: 1.2,
    meat: 3.2,
}

class BurgerBuilder extends Component{
    constructor(props){
        super(props);
        this.state = {
            ingredients: {
                salad: 0,
                cheese: 0,
                bacon: 0,
                meat: 0
            },
            totalPrice: 4,
            purchasable: false,
            purchasing: false,
        };
    }

    addIngredientHandler = type => {
        const previousCount = this.state.ingredients[type];
        const updatedIngredients = { ...this.state.ingredients };
        const newCount = previousCount + 1;
        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        updatedIngredients[type] = newCount;
        this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = type => {
        const previousCount = this.state.ingredients[type];
        if(previousCount > 0){
            const updatedIngredients = { ...this.state.ingredients };
            const newCount = previousCount - 1;
            const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
            updatedIngredients[type] = newCount;
            this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
            this.updatePurchaseState(updatedIngredients);
        }
    }

    updatePurchaseState = (ingredients) => {
        const sumOfIngredients = Object.keys(ingredients)
            .reduce((prev, current) => {
                return prev + ingredients[current];
        }, 0);
        const newPurchasableState = sumOfIngredients === 0 ? false : true;
        this.setState({purchasable: newPurchasableState});
    };

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    cancelPurchaseHandler = () => {
        this.setState({ purchasing: false });
    }

    continuePurchaseHandler = () => {
        alert('Continuing');
    }
 
    render(){
        const disabledButtonsInfo = {...this.state.ingredients}
        for (let key in disabledButtonsInfo) {
            disabledButtonsInfo[key] = disabledButtonsInfo[key] === 0;
        }

        return (
            <Auxiliary>
                <Modal 
                    visible={this.state.purchasing}
                    hideModalAndBackdrop={this.cancelPurchaseHandler}
                >
                    <OrderSummary 
                        ingredients={this.state.ingredients}
                        totalPrice={this.state.totalPrice}
                        cancelPurchase={this.cancelPurchaseHandler}
                        continuePurchase={this.continuePurchaseHandler}
                    />
                </Modal>
                <Burger ingredients={this.state.ingredients}></Burger>
                <BuildControls
                    addIngredient={this.addIngredientHandler}
                    removeIngredient={this.removeIngredientHandler}
                    disabledButtonsInfo={disabledButtonsInfo}
                    currentPrice={this.state.totalPrice}
                    ordered={this.purchaseHandler}
                    disableOrderButton={!this.state.purchasable}
                />
            </Auxiliary>
        );
    }
}

export default BurgerBuilder;