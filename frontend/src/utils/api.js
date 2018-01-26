const api = 'http://localhost:3001';
let token = localStorage.token;

if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
	'Accept': 'application/json',
	'Authorization': token,
	'Content-Type': 'application/json'
}

export const getCategories = () => fetch(`${api}/categories`, { headers })
	.then(response => response.json())
	
export const getPosts = () => fetch(`${api}/posts`, { headers })
	.then(response => response.json())

export const voteOnThread = (topic, id, vote) => fetch(`${api}/${topic}/${id}`, {
	method: 'POST',
	body: JSON.stringify({option: vote}),
	headers
})	

export const getCommentsPerPost = (id) => fetch(`${api}/posts/${id}/comments`, { headers })
	.then(response => response.json())
	
export const editComment = (id, timestamp, body) => fetch(`${api}/comments/${id}`, {
	method: 'PUT',
	body: JSON.stringify({timestamp, body}),
	headers	
})

export const submitComment = (id, timestamp, body, author, parentId) => fetch(`${api}/comments`, {
	method: 'POST',
	body: JSON.stringify({id, timestamp, body, author, parentId}),
	headers		
})

export const deleteComment = (id) => fetch(`${api}/comments/${id}/`, {
	method: 'DELETE',
	body: JSON.stringify({deleted: true}),
	headers
})

export const createNewPost = (id, timestamp, title, body, author, category) => fetch(`${api}/posts`, {
	method: 'POST',
	body: JSON.stringify({id, timestamp, title, body, author, category}),
	headers		
})








