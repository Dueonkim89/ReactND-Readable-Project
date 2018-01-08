import { 
SET_CATEGORIES, GET_POSTS, SORT_BY_VOTESCORE, SORT_BY_OLDEST, SORT_BY_NEWEST
} from '../actions/index.js';
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
	}	else if (action.type === SORT_BY_VOTESCORE) {
			return [...state].sort( (a,b) =>  b.voteScore - a.voteScore )
	}	else if (action.type === SORT_BY_OLDEST) {
			return [...state].sort( (a,b) =>  a.timestamp - b.timestamp )
	}	else if (action.type === SORT_BY_NEWEST) {
			return [...state].sort( (a,b) =>  b.timestamp - a.timestamp )
	}	else {
			return state;
	}
}

// reducer to make comments



export default combineReducers({
	categories,
	posts
})

	

































