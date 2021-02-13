import * as actionTypes from '../actions/actionTypes';

const initialState = {
	results: [],
};

const reducer = (state = initialState, action) => {
	const updatedState = { ...state };
	switch (action.type) {
		case actionTypes.STORE_RESULT:
			updatedState.results = updatedState.results.concat({
				id: new Date(),
				value: action.payload.result,
			});
			console.log(updatedState.results);
			break;
		case actionTypes.DELETE_RESULT:
			const updatedResults = updatedState.results.filter(
				element => element.id !== action.payload.uniqueID,
			);
			updatedState.results = [...updatedResults];
			break;
		default:
			break;
	}

	return updatedState;
};

export default reducer;
