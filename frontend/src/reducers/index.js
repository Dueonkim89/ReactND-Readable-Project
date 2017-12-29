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
	const {author, body, category, commentCount, deleted, id, timestamp, title, voteScore } = action;
	if (action.type === GET_POSTS) {
		return [
			...state,
			{ author, 
			  body,
			  category,
			  commentCount,
			  deleted,
			  id,
			  timestamp,
			  title,
			  voteScore
			}
		]
	} else {
		return state;
	}
}

// reducer to make comments



export default combineReducers({
	categories,
	posts
})

	

































