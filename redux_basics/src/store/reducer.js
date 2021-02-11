import * as actionTypes from './actions';

const initialState = {
	counter: 0,
	results: [],
};

const reducer = (state = initialState, action) => {
	const updatedState = { ...state };
	switch (action.type) {
		case actionTypes.INCREMENT:
			updatedState.counter += 1;
			break;
		case actionTypes.DECREMENT:
			updatedState.counter -= 1;
			break;
		case actionTypes.ADD:
			updatedState.counter += action.payload.value;
			break;
		case actionTypes.SUBTRACT:
			updatedState.counter -= action.payload.value;
			break;
		case actionTypes.STORE_RESULT:
			updatedState.results = updatedState.results.concat({
				id: new Date(),
				value: updatedState.counter,
			});
			console.log(updatedState.results);
			break;
		case actionTypes.DELETE_RESULT:
			const updatedResults = updatedState.results.filter(
				(element) => element.id !== action.payload.uniqueID
			);
			updatedState.results = [...updatedResults];
			break;
		default:
			break;
	}

	return updatedState;
};

export default reducer;
