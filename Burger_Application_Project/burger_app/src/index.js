import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import orderReducer from './store/reducers/order';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import authReducer from './store/reducers/auth';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';

import thunk from 'redux-thunk';

const composeEnhancers =
	process.env.NODE === 'development'
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		: null || compose;

const rootReducer = combineReducers({
	order: orderReducer,
	burgerBuilder: burgerBuilderReducer,
	auth: authReducer,
});

const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
	<Provider store={store}>
		<React.StrictMode>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</React.StrictMode>
	</Provider>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
