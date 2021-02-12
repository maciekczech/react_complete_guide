import * as actionTypes from './../actions';

const initialState = {
	personArray: [],
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case actionTypes.ADD_PERSON:
			const newPerson = {
				id: Math.random(), // not really unique but good enough here!
				name: payload.name,
				age: Math.floor(Math.random() * 40),
			};
			return {
				...state,
				personArray: state.personArray.concat(newPerson),
			};

		case actionTypes.DELETE_PERSON:
			const updatedPersonArray = state.personArray.filter(
				(el) => el.id !== payload.id
			);
			return {
				...state,
				personArray: [...updatedPersonArray],
			};

		default:
			return state;
	}
};
