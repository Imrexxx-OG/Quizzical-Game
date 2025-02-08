import React from "react";
import { decode } from "html-entities";

export default function Night(props) {
  const [shuffledQuestions, setShuffledQuestions] = React.useState([]);
  const [selectedAns, setSelectedAns] = React.useState({});
  const [quizComplete, setQuizComplete] = React.useState(false);
  const [correct, setCorrect] = React.useState(0);

  React.useEffect(() => {
    const processedQuestions = props.fetchArray.map(item => ({
      ...item,
      shuffledOptions: [...item.incorrect_answers, item.correct_answer].sort(() => Math.random() - 0.5),
    }));
    setShuffledQuestions(processedQuestions);
  }, [props.fetchArray]);

  function handleChange(e) {
    const { name, value } = e.target;
    setSelectedAns(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleCheckAnswers() {
    if (quizComplete === false) {
      let correctCount = 0;

      shuffledQuestions.forEach((question, index) => {
        if (selectedAns[`option_${index}`] === question.correct_answer) {
          correctCount++;
        }
      });

      setCorrect(correctCount);
      setQuizComplete(true);
    } else {
      props.handleQuiz(); // restart game
    }
  }

  return (
    <div className="night-container">
      {shuffledQuestions.length > 0 ? (
        shuffledQuestions.map((item, index) => (
          <div className="question" key={index}>
            <p className="question-text">{decode(item.question)}</p> {/* Added class for better styling */}
            <div className="options-container">
              <ul className="click-option">
                {item.shuffledOptions.map((option, i) => (
                  <li className="option" key={i}>
                    <label htmlFor={`option_${index}_${i}`} className="option-label">
                      <input
                        type="radio"
                        id={`option_${index}_${i}`}
                        value={option}
                        name={`option_${index}`}
                        checked={selectedAns[`option_${index}`] === option}
                        onChange={handleChange}
                        className="option-input" // Added a class for consistent styling
                      />
                      {decode(option)}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      ) : (
        <p>Loading questions...</p>
      )}

      <div className="score">
        {quizComplete && <p>You scored {correct}/{shuffledQuestions.length} correct answers.</p>}

        <button onClick={handleCheckAnswers} className="score-button">
          {quizComplete ? "Play again" : "Check Answers"}
        </button>
      </div>
    </div>
  );
}
