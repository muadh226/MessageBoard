import React from "react";
import {Card} from 'react-bootstrap';

const Message = (props) => {
  return (
    <div className="Message">
      {/*shadow and rounded are bootstrap styles*/}
      <Card className="card shadow rounded-lg" id="message">
        <Card.Body>
          <Card.Title id="messageBody"> {props.body} </Card.Title>
          <Card.Text id="timeStamp"> {props.timestamp} </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Message;
