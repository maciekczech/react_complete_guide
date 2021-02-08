const redux = require('redux');
const createStore = redux.createStore;

const initialState = {
    counter: 0,
};

//Reducer
const rootReducer = (state = initialState, action) => {
    const newState = {...state};
    switch (action.type) {
        case 'INC_COUNTER':
            newState.counter += 1;
            break;
        case 'ADD_COUNTER':
            newState.counter += action.payload.value;
            break;
        default:
            return state;
            break;
    }
    return newState;
}

//Store
const store = createStore(rootReducer);
console.log(store.getState());

//Subscription
store.subscribe( () => {
    console.log("Subscription", store.getState());
});
 
//Dispatching Action
store.dispatch({type: 'INC_COUNTER'});
console.log(store.getState());
store.dispatch({type: 'ADD_COUNTER', payload: {value: 10}});
console.log(store.getState());

