import * as actionTypes from '../actions/actionTypes';
import { updateObject } from './../utils';

const initialState = {
	results: [],
};

const storeResult = (state, action) => {
	const updatedResults = state.results.concat({
		id: new Date(),
		value: action.payload.result,
	});
	return updateObject(state, { results: updatedResults });
};

const deleteResult = (state, action) => {
	const updatedResults = state.results.filter(
		element => element.id !== action.payload.uniqueID,
	);
	return updateObject(state, { results: updatedResults });
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.STORE_RESULT:
			return storeResult(state, action);
		case actionTypes.DELETE_RESULT:
			return deleteResult(state, action);
		default:
			return state;
	}
};

export default reducer;
