import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
import classes from './Burger.module.css'

const burger = props => {

    let transformedIngredients = Object.keys(props.ingredients).map( (currentIngredient) => {
        return [...Array(props.ingredients[currentIngredient])].map ((_, i) => {
            return <BurgerIngredient key={currentIngredient + i} type={currentIngredient}></BurgerIngredient>
        });
    })
    .reduce((arr, currentElement) => {
        return arr.concat(currentElement);
    }, []);

    if(transformedIngredients.length === 0){
        transformedIngredients = <div> Please start adding ingredients</div>;
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top'/>
            {transformedIngredients}
            <BurgerIngredient type='bread-bottom'/>
        </div>
    );
};

export default burger;