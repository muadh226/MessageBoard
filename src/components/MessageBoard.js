import React, {useState, useEffect} from 'react';
import Navbar from "./Navbar";
import PostCreator from "./PostCreator";
import PageHandler from "./PageHandler";
import Message from "./Message";
import firebase from "./Firebase";
import {Button} from 'react-bootstrap';


const MessageBoard = () => {
  document.body.style.backgroundColor = "#dbdbdb";

  const [isOpen, toggleModal] = useState(false); //Modal State
  const openModal = () => toggleModal(true);
  const closeModal = () => {
    toggleModal(false);
    toggleScheduled(false);
  }

  const [messages, getMessages] = useState([]); //Array of Messages

  const [upload, setUpload] = useState(""); //Post Form content
  const [isScheduled, toggleScheduled] = useState(false); //is Post Scheduled
  const [startDate, setStartDate] = useState(new Date()); //Date for Scheduling

  const schedule = () => {
    toggleScheduled(true);
  }

  const submitPost = () => {
    if (!isScheduled){
      firebase.firestore().collection('messages').add({ //upload post to database
        text: upload,
        timestamp: new Date()
      });
    } else {
      firebase.firestore().collection('messages').add({ //upload post to database
        text: upload,
        timestamp: startDate
      });
    }
    closeModal();
  };

  const setPostContents = (input) => {
    setUpload(input.target.value);
  }

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
          messageDetails.timestamp = timeStamp;
          dateString = new Date(timeStamp).toDateString();
          timeString = new Date(timeStamp).toLocaleTimeString();
          messageDetails.formattedTimeStamp = dateString + " at " + timeString;
        } else {
          timeStamp = timeStamp.seconds*1000;
          messageDetails.timestamp = timeStamp;
          dateString = new Date(timeStamp).toDateString();
          timeString = new Date(timeStamp).toLocaleTimeString();
          messageDetails.formattedTimeStamp = dateString + " at " + timeString;
        }
        messageThread.push(messageDetails);
      });
      getMessages(messageThread);
    })
  }

  useEffect(() => {
    getMessageThread();
  }, [])

  const postsPerPage = 10; //Pagination variables
  const numPages = Math.round(messages.length / postsPerPage);
  const [currentPage, changePage] = useState(0);
  const [prevDisabled, togglePrevButton] = useState(true);
  const [nextDisabled, toggleNextButton] = useState(false);

  const nextPage = () => {
    changePage(currentPage + 1);
    togglePrevButton(false);
    if (currentPage == numPages-1) {
      toggleNextButton(true);
    }
  }

  const prevPage = () => {
    changePage(currentPage - 1);
    toggleNextButton(false);
    if (currentPage == 1) {
      togglePrevButton(true);
    }
  }

  const getCurrentPageContents = () => {
    const start = currentPage * (postsPerPage);
    const stop = start + postsPerPage;
    return messages.slice(start, stop);
  };

  console.log(messages.length);

  return (
    <div className="Main">
      <Navbar />
      <Button className="NewPostButton" variant="success" onClick={openModal}>Create New Post</Button>
      {/*Pagination*/}
      <PageHandler
        prev = {prevPage}
        next = {nextPage}
        currentPage = {currentPage}
        prevDisabled = {prevDisabled}
        nextDisabled = {nextDisabled}
        />
      <PostCreator
        close = {closeModal}
        isOpen = {isOpen}
        submit = {submitPost}
        setPost = {setPostContents}
        Date = {startDate}
        setDate = {setStartDate}
        isScheduled = {isScheduled}
        schedule = {schedule}
        />

      {getCurrentPageContents().filter(message => (new Date(message.timestamp)).getTime() <= (new Date()).getTime()).map((message) => (
        <div key = {message.id}>
          <Message body={message.text} timestamp={message.formattedTimeStamp} />
        </div>
      ))}

    </div>
  );
}

export default MessageBoard;
