import React from "react"
import Morning from "./components/Morning"
import Night from "./components/Night"

export default function App(){
    const [dataLoaded, setDataLoaded] = React.useState(false)
    const [quizData, setQuizData] = React.useState([])
    const [startQuiz, setStartQuiz] = React.useState(true)
    
    function handleQuiz(){
        setStartQuiz(prevQuiz => !prevQuiz)
        if(!startQuiz){
            fetchQuestion()
        }
    }

    function fetchQuestion(){
        setDataLoaded(false)
        // Reset loading state to show "loading" message while new questions are being fetched.
        fetch("https://opentdb.com/api.php?amount=5&type=multiple")
            .then(res => res.json())
            .then(data => {
                setQuizData(data.results)
                setDataLoaded(true)
            })
    }
    
    React.useEffect(()=> {
        fetchQuestion()
    }, [])

    
    if (startQuiz){
        return (
        <div className="quiz-container">
            <Morning startQuiz={startQuiz} handleQuiz={handleQuiz} />
        </div> 
        )
    } else if (!startQuiz && dataLoaded){
        return (
            <div className="quiz-container">
                <Night fetchArray={quizData} handleQuiz={handleQuiz}  />
            </div>
        )
    } else if (!startQuiz && !dataLoaded) {
        return <div>Loading questions...</div>;
    }
}