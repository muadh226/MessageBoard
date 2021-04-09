import React, {useState, useEffect} from 'react';
import Navbar from "./Navbar";
import Message from "./Message";
import firebase from "./Firebase"
import {Modal, Button, Form} from 'react-bootstrap';


const Main = () => {
  document.body.style.backgroundColor = "#dbdbdb";

  const [isOpen, toggleModal] = useState(false); //Modal State
  const openModal = () => toggleModal(true);
  const closeModal = () => toggleModal(false);

  const [messages, getMessages] = useState([]); //Array of Messages

  const [upload, setUpload] = useState(""); //Post Form content

  const data = firebase.firestore().collection('messages').orderBy('timestamp', 'desc');

  const getMessageThread = () => {
    data.onSnapshot((query) => {
      const messageThread = [];
      var messageDetails = {}; var dateString; var timeString; //Initialize variables
      var timeStamp; var timeInMilliseconds; var formattedTimeStamp;

      query.forEach((message) => {
        messageDetails = message.data();
        timeStamp = (messageDetails.timestamp);
        if (Number.isInteger(timeStamp)) { //format timestamps
          timeStamp = timeStamp*1000;
          dateString = new Date(timeStamp).toDateString();
          timeString = new Date(timeStamp).toLocaleTimeString();
          messageDetails.formattedTimeStamp = dateString + " at " + timeString;
        } else {
          timeStamp = timeStamp.seconds*1000
          dateString = new Date(timeStamp).toDateString();
          timeString = new Date(timeStamp).toLocaleTimeString();
          messageDetails.formattedTimeStamp = dateString + " at " + timeString;
        }
        messageThread.push(messageDetails);
      });
      getMessages(messageThread);
    })
  }

  const submitPost = () => {
    firebase.firestore().collection('messages').add({ //uploadpost to database
      text: upload,
      timestamp: new Date()
    });
    console.log(upload);
    console.log(new Date());
    closeModal();
  };

  const setPostContents = (input) => {
    setUpload(input.target.value);
  }

  useEffect(() => {
    getMessageThread();
  }, [])

  return (
    <div className="Main">
      <Navbar />
      <Button className="NewPostButton" variant="success" onClick={openModal}>Create New Post</Button>
      <Modal show={isOpen} onHide={closeModal}> {/*New Post Modal*/}
        <Modal.Header closeButton>
          <Modal.Title>Write a new post!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            id = "textInput"
            onChange={(input) => {setPostContents(input)}}
            placeholder = "Share a resource, ask a question, or something else..."/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={submitPost}>Post</Button>
          <Button variant="secondary" onClick={closeModal}>Close</Button>
        </Modal.Footer>
      </Modal>
      {messages.map((message) => (
        <div key = {message.id}>
          <Message body={message.text} timestamp={message.formattedTimeStamp} />
        </div>
      ))}
    </div>
  );
}

export default Main;
