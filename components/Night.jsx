import React from "react";
import {decode} from "html-entities"

export default function Night(props){
  
  const [afternoonResult, setAfternoonResult] = React.useState([])
  
  function optionClicked(e){
    const clickedOption = document.getElementsByClassName(".option")
    
    for (let i = 0; i < clickedOption.length; i++){
      clickedOption[i].style.backgroundColor = ""
    }
    e.target.style.backgroundColor = "yellow"
    e.target.style.color = "black"
  }
  
  function handleAnswers(e){
    console.log("Checking Answers....")
    const myAnswers = props.fetchArray
    for(let i = 0; i < myAnswers.length; i++){
      const answerChosen = []
      if(myAnswers[i].correct_answer === e.target.value){
        console.log("correct answer")
        answerChosen.push(...myAnswers.correct_answer)
      } else {
        console.log("incorrect answer")
      }
    } return answerChosen
    
  }
  
  return (
    <div className="night-container">
      {
        props.fetchArray.map((item, index) => (
          <div className="question">
            <p key={index}>{decode(item.question)}</p>
            <div className="options-container">
              <ul class="click-option">
              {
                [item.correct_answer, ...item.incorrect_answers].sort(() => Math.random() - 0.5).map((option, i) => {
                  return (
                    <li className="option" key={i}>
                      <label htmlFor={`option_${index}_${i}`}>
                        <input 
                          type="radio"
                          id={`option_${index}_${i}`}
                          value={option} 
                          name={`option_${index}`} />{decode(option)}
                      </label>
                    </li>
                    
                  )
                })
              }
              </ul>
            </div>
          </div>
        ))
      }

      <div className="score">
        {/* <p>You scored 3/5 correct answers</p> */}
        <button onClick={handleAnswers}>{props.fetchArray ? "Check Answers" : "Play again"}</button>
      </div>
    </div>
  )
}