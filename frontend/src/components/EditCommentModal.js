import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';


class EditCommentModal extends Component {
	render() {	
		const { value, hide, author, comment, updateAuthor, updateComment, submitEditedComment, disable 		
		} = this.props;
		return (
				<Modal show={value} onHide={hide}>
					<Modal.Header closeButton>
						<Modal.Title className='modal-comment-header' style={{fontWeight: 'bold'}} >
							Comment
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<form>
							<textarea className='modal-textarea' placeholder="Add comment"
								value={comment} onChange={(event) => {updateComment(event.target.value)}} >												
							</textarea>
						
							<label className='modal-comment-author'>Author</label>
							<input type="text" id="author-input" placeholder="Author" 
								disabled={disable}
								value={author} onChange={(event) => {updateAuthor(event.target.value)}}								
							/>							
						</form>
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={submitEditedComment}>Submit</Button>
						<Button onClick={hide}>Cancel</Button>
					</Modal.Footer>
				</Modal>				
		)	
	}		
}

export default EditCommentModal;