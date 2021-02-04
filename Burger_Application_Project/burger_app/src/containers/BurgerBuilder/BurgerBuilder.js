import React, {Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from './../../components/Burger/Burger';
import BuildControls from './../../components/Burger/BuildControls/BuildControls';
import OrderSummary from './../../components/Burger/OrderSummary/OrderSummary';
import Modal from './../../components/UI/Modal/Modal'
import Spinner from './../../components/UI/Spinner/Spinner';

import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler'

import axios from './../../axios-orders';


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
            ingredients: null,
            totalPrice: 4,
            purchasable: false,
            purchasing: false,
            orderLoading: false,
            error: false,
        };
    }

    componentDidMount(){
        axios.get('/ingredients.json').then(response => {
            console.log(response);
            this.setState({ ingredients: response.data, purchasable: true});
        }).catch(err => {
            console.log(err);
        })
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
/*         const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
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

        this.setState({orderLoading: true});

        axios.post('/orders.json', order)
        .then(response => {
            this.setState({orderLoading: false, purchasing: false});
        })
        .catch(error => {
            this.setState({error: error});
            console.log(error);
        }); */
        const queryParams = [];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + this.state.ingredients[i]);
        }
        const queryString = queryParams.join('&'); 
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString,
        });

    }
 
    render(){
        const disabledButtonsInfo = {...this.state.ingredients}
        for (let key in disabledButtonsInfo) {
            disabledButtonsInfo[key] = disabledButtonsInfo[key] === 0;
        }

        let burger = <Spinner/>
        let orderSummary = null;

        if(this.state.ingredients){
            burger =  
            <>
                <Burger ingredients={this.state.ingredients}></Burger>
                <BuildControls
                    addIngredient={this.addIngredientHandler}
                    removeIngredient={this.removeIngredientHandler}
                    disabledButtonsInfo={disabledButtonsInfo}
                    currentPrice={this.state.totalPrice}
                    ordered={this.purchaseHandler}
                    disableOrderButton={!this.state.purchasable}
                />
            </>
            orderSummary = 
            <OrderSummary 
                ingredients={this.state.ingredients}
                totalPrice={this.state.totalPrice}
                cancelPurchase={this.cancelPurchaseHandler}
                continuePurchase={this.continuePurchaseHandler}
            />;
        }

        if(this.state.orderLoading){
            orderSummary = <Spinner />;
        }

        return (
            <Auxiliary>
                <Modal 
                    visible={this.state.purchasing}
                    hideModalAndBackdrop={this.cancelPurchaseHandler}
                >
                    {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);