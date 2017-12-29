const api = 'http://localhost:3001';
const headers = {
  Authorization: 'Udacity Readable Server'
};


export const getCategories = () => fetch(`${api}/categories`, { headers })
	.then(response => response.json())
	
export const getPosts = () => fetch(`${api}/posts`, { headers })
	.then(response => response.json())
	

