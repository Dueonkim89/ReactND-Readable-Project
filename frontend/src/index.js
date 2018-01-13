import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App.js';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import combineReducers from './reducers/index.js';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
//import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	combineReducers,
	composeEnhancers(
		applyMiddleware(thunk)	
	)
);


ReactDOM.render(
<BrowserRouter>
	<Provider store={store}>
		<App />
	</Provider>
</BrowserRouter>
, document.getElementById('root'));
registerServiceWorker();
