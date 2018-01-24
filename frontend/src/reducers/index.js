import { 
SET_CATEGORIES, GET_POSTS, SORT_BY_VOTESCORE, SORT_BY_OLDEST, SORT_BY_NEWEST, UPDATE_POST_VOTESCORE, 
GET_COMMENTS, UPDATE_COMMENT_VOTESCORE, DELETE_COMMENTS, EDIT_COMMENTS
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
	}	else if (action.type === UPDATE_POST_VOTESCORE) {
			/*Pure function that filters state to find the specific post that was changed
			 Once, it is found. We map it to change the voteScore to the updated score. 
			 Then we filter the store again to find the other unaltered posts, and splice in the changed
			 post into the exact same position it was in the original state. 
			*/		
			let position;
			let postToBeChanged = [...state].filter( (x, index) => {
				if (x.id === id) {
					position = index;
				}
				return x.id === id;
			}).map((item) => {
				return {...item, voteScore}
			})
			let updatedState = [...state].filter( x => x.id !== id );
			updatedState.splice(position, 0, ...postToBeChanged);
			return updatedState;
	}	else {
			return state;
	}
}

// reducer to make comments
function comments(state = [], action) {
	const { id, parentId, timestamp, body, author, voteScore, deleted, parentDeleted } = action;
	if (action.type === GET_COMMENTS) {
		return [
			...state,
			{ id, 
			  parentId,
			  timestamp,
			  body,
			  author,
			  voteScore,
			  deleted,
			  parentDeleted
			}
		].sort( (a,b) =>  a.timestamp - b.timestamp )		
	}	else if (action.type === UPDATE_COMMENT_VOTESCORE) {
			let position;
			let commentToBeChanged = [...state].filter( (x, index) => {
				if (x.id === id) {
					position = index;
				}
				return x.id === id;
			}).map((item) => {
				return {...item, voteScore}
			})
			let updatedState = [...state].filter( x => x.id !== id );
			updatedState.splice(position, 0, ...commentToBeChanged);
			return updatedState;		
	}	else if (action.type === DELETE_COMMENTS) {	
			return [...state].filter( x => x.id !== id );
	}	else if (action.type === EDIT_COMMENTS) {
			let commentToBeChanged = [...state].filter( x => {
				return x.id === id;
			}).map((item) => {
				return {...item, body, timestamp}
			})
			let commentsToReturn = [...state].filter( x => x.id !== id ).concat(commentToBeChanged);
			return commentsToReturn.sort( (a,b) =>  a.timestamp - b.timestamp );
	}	else {
		return state;
	}	
}


export default combineReducers({
	categories,
	posts,
	comments
})

	

































