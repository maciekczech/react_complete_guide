const initialState = {
	counter: 0,
};

const reducer = (state = initialState, action) => {
	const updatedState = { ...state };
	switch (action.type) {
		case 'INCREMENT':
			return {
				counter: state.counter + 1,
			};
			break;
		case 'DECREMENT':
			updatedState.counter -= 1;
			break;
		case 'ADD':
			updatedState.counter += action.payload.value;
			break;
		case 'SUBTRACT':
			updatedState.counter -= action.payload.value;
			break;
		default:
			break;
	}

	return updatedState;
};

export default reducer;
