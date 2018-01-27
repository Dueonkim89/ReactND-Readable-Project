import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

//PostModal will require title, category. Title will be input field and category will be select menu
//This component will be referenced inside DisplayPosts component. 
//Created server method, action creator and reducer to create new post.
// Controlled component and pass in the necessary props.
//state inside DisplayPosts will have: title, body, author, category
// alert box if valid category is not selected. (if state === default)
//Use uuid for id, Date.now() for timestamp, 

//toggle className and display based on state.

class PostModal extends Component {
	render() {	
		const { value, hide, author, post, updateAuthor, updatePost, submitPost, title, updateTitle, 
		category, updateCategory, categoryMissing, disableSelectMenu } = this.props;
		return (
				<Modal show={value} onHide={hide}>
					<Modal.Header closeButton>
						<Modal.Title className='modal-comment-header' style={{fontWeight: 'bold'}} >
							New Post
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<form>
							<label className='modal-comment-title'>Title</label>
							<input type="text" id="title-input" placeholder="Title" 
								value={title} onChange={(event) => {updateTitle(event.target.value)}}								
							/>
							<label className='modal-comment-body'>Body</label>							
							<textarea className='modal-textarea' placeholder="Body"
								value={post} onChange={(event) => {updatePost(event.target.value)}} >												
							</textarea>
						
							<label className='modal-comment-author'>Author</label>
							<input type="text" id="author-input" placeholder="Author" 
								value={author} onChange={(event) => {updateAuthor(event.target.value)}}								
							/>
							
							<label className={categoryMissing ? 'modal-comment-category-warning' : 'modal-comment-category'} >
							  Category:
							</label>
							  <select className={categoryMissing ? 'select-menu-warning' : ''} disabled={disableSelectMenu}
							  value={category} onChange={(event) => {updateCategory(event.target.value)}}	>
								<option value="default" disabled={true}>Choose a category</option>
								<option value="react">React</option>
								<option value="redux">Redux</option>
								<option value="udacity">Udacity</option>
							  </select>
							
							<p style={{display: categoryMissing ? '' : 'none' }} 
							className='warning-message'>Please choose a category!
							</p>
						</form>
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={submitPost}>Submit</Button>
						<Button onClick={hide}>Cancel</Button>						
					</Modal.Footer>
				</Modal>				
		)	
	}		
}

export default PostModal;