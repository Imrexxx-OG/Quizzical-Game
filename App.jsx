import React from "react"
import Morning from "./components/Morning"
import Night from "./components/Night"

export default function App(){

    const dataCache = React.useRef({})
    const [fetchResult, setFetchResult] = React.useState([])
    const [startQuiz, setStartQuiz] = React.useState(true)
    
    function handleQuiz(){
        setStartQuiz(prevQuiz => !prevQuiz)
        // console.log(fetchResult)
    }
    
    React.useEffect(()=> {
        fetch("https://opentdb.com/api.php?amount=5&type=multiple")
            .then(res => res.json())
            .then(data => {
                dataCache.current = data.results
            })
    }, [])

    // return (
    //     <div className="quiz-container">
    //         <Morning 
    //             startQuiz={startQuiz}
    //             handleQuiz={handleQuiz}
    //         />
    //         {startQuiz === false && <Afternoon 
    //             fetchArray={fetchResult}
    //         />}
    //     </div>
    // )
    if (startQuiz){
        return (
        <div className="quiz-container">
            <Morning startQuiz={startQuiz} handleQuiz={handleQuiz} />
        </div> 
        )
    } else if (startQuiz === false){
        return (
            <div className="quiz-container">
                <Night fetchArray={dataCache.current}  />
            </div>
        )
    }
}