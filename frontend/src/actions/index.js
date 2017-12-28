export const SET_CATEGORIES = 'SET_CATEGORIES';
export const GET_POSTS = 'GET_POSTS';
export const CREATE_COMMENTS = 'CREATE_COMMENTS';

export function setCategories({name, path}) {
	return {
		type: SET_CATEGORIES,
		name,
		path
	}
}

export function getPosts({id, timestamp, title, body, author, category, voteScore, deleted}) {
	return {
		type: GET_POSTS,
		id,
		timestamp,
		title,
		body,
		author,
		category,
		voteScore,
		deleted
	}
}


