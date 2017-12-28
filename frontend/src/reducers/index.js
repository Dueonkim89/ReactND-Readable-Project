import { SET_CATEGORIES, GET_POSTS } from '../actions/index.js';
import { combineReducers } from 'redux';

function categories(state = [], action) {
	const {name, path} = action;
	
	if (action.type === SET_CATEGORIES) {
		return [
			...state,
			{ name, 
			  path
			}
		]
	} else {
		return state;
	}			
}


function posts( state = [], action) {
	// TO WORK ON LATER. NEED AN ARRAY OF OBJECTS.
	// EACH index will represent an object with its properties 
}



export default combineReducers({
	categories
})

	

































