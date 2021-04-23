import React, {useState} from "react";
import {Button} from 'react-bootstrap';


const PageHandler = (props) => {

  const prevProps = props.prevDisabled ? { disabled: true} : {}; //disable buttons if no previous or next page
  const nextProps = props.nextDisabled ? { disabled: true} : {};

  return (
    <div className="PageHandler">
      <Button className="PrevButton" variant="info" size="sm" {...prevProps} onClick={props.prev}>
      prev </Button> {/*prev button*/}
      <p className="pageIndex">Page: {props.currentPage+1}</p>
      <Button className="NextButton" variant="info" size="sm" {...nextProps} onClick={props.next}>
      next </Button> {/*next button*/}
    </div>
  );
}

export default PageHandler;
