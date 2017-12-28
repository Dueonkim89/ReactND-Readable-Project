import { SET_CATEGORIES, GET_POSTS } from '../actions/index.js';

const initialCategoryState = [
	{name: 'React', path: null},
	{name: 'Redux', path: null},
	{name: 'Udacity', path: null}
]

function category (state = initialCategoryState, action) {
	const {name, path} = action;
	
	if (action.type === 'SET_CATEGORIES') {
		return {
			...state,
			[name]: {
				...state[name]
			}
		}
	} else {
		return state;
	}			
}

export default category;
	

































