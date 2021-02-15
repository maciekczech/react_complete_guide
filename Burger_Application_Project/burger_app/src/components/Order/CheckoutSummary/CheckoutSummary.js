import { React } from 'react';
import Burger from './../../Burger/Burger';
//import axios from './../../../axios-orders';
import Button from './../../UI/Button/Button';

const CheckoutSummary = props => {
	return (
		<div style={{ textAlign: 'center' }}>
			<h1>We hope it tastes well!</h1>
			<div>
				<Burger
					ingredients={props.ingredients}
					style={{ width: '100%', margin: 'auto' }}
				/>
			</div>
			<Button buttonType="Danger" clicked={props.checkoutCancelled}>
				{' '}
				Cancel{' '}
			</Button>
			<Button buttonType="Success" clicked={props.checkoutContinued}>
				{' '}
				Continue{' '}
			</Button>
		</div>
	);
};

export default CheckoutSummary;
