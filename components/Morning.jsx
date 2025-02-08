import React from "react";

export default function Morning(props) {
  return (
    <div className={props.startQuiz ? "morning-container" : "dawn-container"}>
      <div className="morning-content">
        <h2>Quizzical</h2>
        <p>
          Quizzical is an interactive and fun trivia game designed to test your
          knowledge across various topics! 🌍📚
        </p>
        <p>
          Whether you're a casual player looking for a quick challenge or a trivia 
          master aiming for a high score, Quizzical offers an exciting and engaging 
          experience.
        </p>
        <button className="morning-button" onClick={props.handleQuiz}>
          Start Quiz
        </button>
      </div>
    </div>
  );
}
