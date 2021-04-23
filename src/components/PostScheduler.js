import React, {useState} from "react";
import {Modal, Button, Form} from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'

const PostScheduler = (props) => {

  const today = new Date().getDate() === props.date.getDate();
  const dateInFuture = +props.date > +(new Date()).setHours(23,59,59,999);;

  let minHour = new Date().getHours();
  if (!today) minHour = 0;

  const date = new Date();
  let currentMins = date.getMinutes(); //All this to make previous times only disabled today
  let currentHour = date.getHours();
  if (dateInFuture) {
    currentHour = 0;
    currentMins = 0;
  }

  if (!props.isScheduled){
    return (
      <div className="PostScheduler">
        <Button className="SchedulePostButton" onClick={props.schedule} variant="info">Schedule Post For Later</Button>
      </div>
    );
  }
  else {
    return (
      <div className="PostScheduler">
        <DatePicker
          id = "DateTimePicker"
          showTimeSelect
          selected={props.date}
          onChange={date => props.setDate(date)}
          dateFormat="Pp"
          timeIntervals ={15}
          minDate={new Date()}
          minTime={new Date(new Date().setHours(currentHour, currentMins, 0, 0))}
          maxTime={new Date(new Date().setHours(23, 59, 0, 0))}
          placeholderText="Select date and time"
          />
      </div>
    );
  }
}

export default PostScheduler;
