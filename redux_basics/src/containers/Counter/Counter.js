import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
	increment,
	decrement,
	add,
	subtract,
	storeResult,
	deleteResult,
} from '../../store/actions/allActions';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

class Counter extends Component {
	state = {
		counter: 0,
	};

	counterChangedHandler = (action, value) => {
		switch (action) {
			case 'inc':
				this.setState(prevState => {
					return { counter: prevState.counter + 1 };
				});
				break;
			case 'dec':
				this.setState(prevState => {
					return { counter: prevState.counter - 1 };
				});
				break;
			case 'add':
				this.setState(prevState => {
					return { counter: prevState.counter + value };
				});
				break;
			case 'sub':
				this.setState(prevState => {
					return { counter: prevState.counter - value };
				});
				break;
		}
	};

	render() {
		return (
			<div>
				<CounterOutput value={this.props.ctr} />
				<CounterControl
					label="Increment"
					clicked={this.props.onIncrementCounter}
				/>
				<CounterControl
					label="Decrement"
					clicked={this.props.onDecrementCounter}
				/>
				<CounterControl
					label="Add 5"
					clicked={() => {
						this.props.onAddCounter(7);
					}}
				/>
				<CounterControl
					label="Subtract 5"
					clicked={this.props.onSubtractCounter}
				/>

				<hr />
				<button
					onClick={() => {
						this.props.onStoreResult(this.props.ctr);
					}}>
					{' '}
					Store Result{' '}
				</button>
				<ul>
					{this.props.storedResults.map(element => {
						return (
							<li
								key={element.id}
								onClick={() =>
									this.props.onDeleteResult(element.id)
								}>
								{element.value}
							</li>
						);
					})}
				</ul>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		ctr: state.counter.counter,
		storedResults: state.result.results,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onIncrementCounter: () => dispatch(increment()),
		onDecrementCounter: () => dispatch(decrement()),
		onAddCounter: val => dispatch(add({ value: val })),
		onSubtractCounter: () => dispatch(subtract({ value: 5 })),
		onStoreResult: result => dispatch(storeResult({ result: result })),
		onDeleteResult: id => dispatch(deleteResult({ uniqueID: id })),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
