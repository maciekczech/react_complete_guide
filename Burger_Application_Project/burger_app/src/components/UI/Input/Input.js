import React from 'react';
import classes from './Input.module.css';

const input = props => {
	let inputElement = null;

	const inputClasses = [classes.InputElement];
	if (!props.valid && props.shouldValidate && props.touched) {
		inputClasses.push(classes.Invalid);
	}

	switch (props.elementType) {
		case 'input':
			inputElement = (
				<input
					identifier={props.formIdentifier}
					className={inputClasses.join(' ')}
					onChange={props.changed}
					value={props.value}
					{...props.elementConfig}
				/>
			);
			break;
		case 'textarea':
			inputElement = (
				<textarea
					identifier={props.formIdentifier}
					className={inputClasses.join(' ')}
					onChange={props.changed}
					value={props.value}
					{...props.elementConfig}
				/>
			);
			break;
		case 'select':
			inputElement = (
				<select
					identifier={props.formIdentifier}
					className={inputClasses.join(' ')}
					onChange={props.changed}
					value={props.value}>
					{' '}
					{props.elementConfig.options.map(option => {
						return (
							<option key={option.value} value={option.value}>
								{option.displayValue}
							</option>
						);
					})}
				</select>
			);
			break;
		default:
			inputElement = (
				<input
					identifier={props.formIdentifier}
					className={inputClasses.join(' ')}
					onChange={props.changed}
					value={props.value}
					{...props.elementConfig}
				/>
			);
	}

	return (
		<div className={classes.Input}>
			<label className={classes.Label}> {props.label} </label>
			{inputElement}
		</div>
	);
};

export default input;
