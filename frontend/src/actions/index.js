import * as ServerCall from '../utils/api.js';
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const GET_POSTS = 'GET_POSTS';
export const CREATE_COMMENTS = 'CREATE_COMMENTS';
export const SORT_BY_VOTESCORE = 'SORT_BY_VOTESCORE';
export const SORT_BY_OLDEST = 'SORT_BY_OLDEST';
export const SORT_BY_NEWEST = 'SORT_BY_NEWEST';
export const UPDATE_POST_VOTESCORE = 'UPDATE_VOTESCORE';
export const UPDATE_POST_COMMENTCOUNT = 'UPDATE_POST_COMMENTCOUNT';
export const GET_COMMENTS = 'GET_COMMENTS';
export const DELETE = 'DELETE';
export const UPDATE_COMMENT_VOTESCORE = 'UPDATE_COMMENT_VOTESCORE';
export const EDIT_COMMENTS = 'EDIT_COMMENTS';
export const EDIT_POSTS = 'EDIT_POSTS';

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

export function removeCommentsOrPosts({ id, deleted }) {
	return {
		type: DELETE,
		id,
		deleted
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

export function updatePostVoteScore({id, voteScore}) {
	return {
		type: UPDATE_POST_VOTESCORE,
		id,
		voteScore
	}
}

export function updatePostCommentCount({id, commentCount}) {
	return {
		type: UPDATE_POST_COMMENTCOUNT,
		id,
		commentCount
	}
}

export function updateCommentVoteScore({id, voteScore}) {
	return {
		type: UPDATE_COMMENT_VOTESCORE,
		id,
		voteScore
	}
}

export function editComment({id, body, timestamp}) {
	return {
		type: EDIT_COMMENTS,
		id,
		body,
		timestamp
	}
}

export function editPost({id, timestamp, body, title}) {
	return {
		type: EDIT_POSTS,
		id,
		timestamp,
		body,
		title
	}
}

export const fetchPostVoteScore = ({type, id, choice}) => dispatch => (
	ServerCall
	.voteOnThread(type, id, choice)
	.then(response => response.json())
	.then(data => dispatch(updatePostVoteScore(data)))
);

export const fetchCommentVoteScore = ({type, id, choice}) => dispatch => (
	ServerCall
	.voteOnThread(type, id, choice)
	.then(response => response.json())
	.then(data => dispatch(updateCommentVoteScore(data)))
);
	
export const postCommentToServer = ({id, timestamp, body, author, parentId}) => dispatch => (
	ServerCall
	.submitComment(id, timestamp, body, author, parentId)
	.then(response => response.json())
	.then(data => dispatch(getComments(data)))
);

export const createNewPost = ({id, timestamp, title, body, author, category}) => dispatch => (
	ServerCall
	.createNewPost(id, timestamp, title, body, author, category)
	.then(response => response.json())
	.then(data => dispatch(getPosts(data)))
);

export const makeChangesToComment = ({id, timestamp, body}) => dispatch => (
	ServerCall
	.editComment(id, timestamp, body)
	.then(response => response.json())
	.then(data => dispatch(editComment(data)))
);

export const deleteCommentOrPost = ({type, id}) => dispatch => (
	ServerCall
	.deleteCommentOrPost(type, id)
	.then(response => response.json())
	.then(data => dispatch(removeCommentsOrPosts(data)))
);

export const makeChangesToPost = ({id, timestamp, body, title}) => dispatch => (
	ServerCall
	.editPost(id, timestamp, body, title)
	.then(response => response.json())
	.then(data => dispatch(editPost(data)))
);


