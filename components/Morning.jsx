import React from "react";

export default function Morning(props){
  
  return (
    <div className={props.startQuiz ? "morning-container" : "dawn-container"}>
      <h2>Quizzical</h2>
      <h4>Quizzical is an interactive and fun trivia game designed to test your knowledge across various topics! 🌍📚</h4>
      <h4>Whether you're a casual player looking for a quick challenge or a trivia master aiming for a high score, Quizzical offers an exciting and engaging experience.</h4>
      <button className="morning-button" onClick={props.handleQuiz}>Start quiz</button>
    </div>
  )
}