import React from "react";
import {Modal, Button, Form} from 'react-bootstrap';
import PostScheduler from './PostScheduler';


const PostCreator = (props) => {

  return (
    <div className="PostCreator">
      <Modal show={props.isOpen} onHide={props.close}> {/*New Post Modal*/}
        <Modal.Header closeButton>
          <Modal.Title>Write a new post!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            id = "textInput"
            onChange={(input) => {props.setPost(input)}}
            placeholder = "Share a resource, ask a question, or something else..."/>
          <PostScheduler
            date={props.Date}
            setDate={props.setDate}
            schedule = {props.schedule}
            isScheduled = {props.isScheduled}
            />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={props.submit}>Post</Button>
          <Button variant="secondary" onClick={props.close}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PostCreator;
