import React from "react";

export default function Morning(props){
  
  return (
    <div className={props.startQuiz ? "morning-container" : "dawn-container"}>
      <h2>Quizzical</h2>
      <h4>Some descriptions if needed</h4>
      <button className="morning-button" onClick={props.handleQuiz}>Start quiz</button>
    </div>
  )
}