import * as ServerCall from '../utils/api.js';
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const GET_POSTS = 'GET_POSTS';
export const CREATE_COMMENTS = 'CREATE_COMMENTS';
export const SORT_BY_VOTESCORE = 'SORT_BY_VOTESCORE';
export const SORT_BY_OLDEST = 'SORT_BY_OLDEST';
export const SORT_BY_NEWEST = 'SORT_BY_NEWEST';
export const UPDATE_VOTESCORE = 'UPDATE_VOTESCORE';
export const GET_COMMENTS = 'GET_COMMENTS';

export function setCategories({name, path}) {
	return {
		type: SET_CATEGORIES,
		name,
		path
	}
}

export function getPosts({id, timestamp, title, body, author, category, voteScore, deleted, commentCount}) {
	return {
		type: GET_POSTS,
		id,
		timestamp,
		title,
		body,
		author,
		category,
		voteScore,
		deleted,
		commentCount
	}
}

export function getComments({id, parentId, timestamp, body, author, voteScore, deleted, parentDeleted}) {
	return {
		type: GET_COMMENTS,
		id,
		parentId,
		timestamp,
		body,
		author,
		voteScore,
		deleted,
		parentDeleted
	}	
}

export function sortByOldestDate() {
	return {
		type: SORT_BY_OLDEST
	}
}

export function sortByNewestDate() {
	return {
		type: SORT_BY_NEWEST
	}
}

export function sortByVoteOrder() {
	return {
		type: SORT_BY_VOTESCORE
	}
}

export function updateVoteScore({id, voteScore}) {
	return {
		type: UPDATE_VOTESCORE,
		id,
		voteScore
	}
}

export const fetchVoteScore = ({type, id, choice}) => dispatch => (
	ServerCall
	.voteOnThread(type, id, choice)
	.then(response => response.json())
	.then(data => dispatch(updateVoteScore(data)))
);
	

