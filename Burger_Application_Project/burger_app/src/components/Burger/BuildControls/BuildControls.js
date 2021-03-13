import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
	{ label: 'Salad', type: 'salad' },
	{ label: 'Bacon', type: 'bacon' },
	{ label: 'Cheese', type: 'cheese' },
	{ label: 'Meat', type: 'meat' },
];

const buildControls = props => (
	<div className={classes.BuildControls}>
		<p>
			Current Price: <strong> {props.currentPrice.toFixed(2)} </strong>
		</p>
		{controls.map(element => (
			<BuildControl
				key={element.label}
				label={element.label}
				more={() => {
					props.addIngredient(element.type);
				}}
				less={() => {
					props.removeIngredient(element.type);
				}}
				isDisabled={
					props.disabledButtonsInfo[element.type]
				}></BuildControl>
		))}
		<button
			className={classes.OrderButton}
			disabled={props.disableOrderButton}
			onClick={props.ordered}>
			{props.isAuthenticated ? 'ORDER NOW!' : 'SIGN UP TO ORDER'}
		</button>
	</div>
);

export default buildControls;
