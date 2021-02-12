import React, { Component } from 'react';
import { connect } from 'react-redux';

import Person from '../components/Person/Person';
import AddPerson from '../components/AddPerson/AddPerson';

import * as actionTypes from './../store/actions';

class Persons extends Component {
	state = {
		inputName: '',
		inputAge: '',
	};

	onInputNameChangeHandler = (event) => {
		this.setState({ inputName: event.target.value });
	};
	onInputAgeChangeHandler = (event) => {
		this.setState({ inputAge: event.target.value });
	};

	render() {
		return (
			<div>
				<AddPerson
					nameChanged={this.onInputNameChangeHandler}
					ageChanged={this.onInputAgeChangeHandler}
					nameValue={this.state.inputName}
					ageValue={this.state.inputAge}
					personAdded={() =>
						this.props.onPersonAdd(
							this.state.inputName,
							this.state.inputAge
						)
					}
				/>
				{this.props.persons.map((person) => (
					<Person
						key={person.id}
						name={person.name}
						age={person.age}
						clicked={() => this.props.onPersonDelete(person.id)}
					/>
				))}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		persons: state.personArray,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onPersonAdd: (name, age) =>
			dispatch({
				type: actionTypes.ADD_PERSON,
				payload: { name: name, age: age },
			}),
		onPersonDelete: (id) =>
			dispatch({
				type: actionTypes.DELETE_PERSON,
				payload: { id: id },
			}),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Persons);
