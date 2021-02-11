import * as actionTypes from './../actions';

const initialState = {
	counter: 0,
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
		default:
			break;
	}

	return updatedState;
};

export default reducer;
