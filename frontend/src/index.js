import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App.js';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux';
import combineReducers from './reducers/index.js';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
//import Bootstrap from 'bootstrap/dist/css/bootstrap.css';


const store = createStore(
	combineReducers,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);




ReactDOM.render(
<BrowserRouter>
	<Provider store={store}>
		<App />
	</Provider>
</BrowserRouter>
, document.getElementById('root'));
registerServiceWorker();
