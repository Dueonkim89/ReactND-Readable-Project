import React, { Component } from 'react';
import * as ServerCall from '../utils/api.js';
import { Modal, Button } from 'react-bootstrap';


class CommentModal extends Component {
	render() {	
		const { value, hide } = this.props;
		return (
				<Modal show={value} onHide={hide}>
					<Modal.Header closeButton>
						<Modal.Title className='modal-comment-header' style={{fontWeight: 'bold'}} >
							Comment
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<form>
							<textarea className='modal-textarea' placeholder="Add comment">						
							</textarea>
						
							<label className='modal-comment-author'>Author</label>
							<input type="text" id="author-input" placeholder="Author" />							
						</form>
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={hide}>Submit</Button>
						<Button onClick={hide}>Cancel</Button>
					</Modal.Footer>
				</Modal>				
		)	
	}		
}

export default CommentModal;