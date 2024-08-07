import { useState } from 'react'

const Header = ({ title }) => {
  return (
    <h1>{title}</h1>
  )
}

const Button = (props) => {
  return (
    <>
      <button onClick={props.onClick}>{props.text} </button>
    </>
  )
}

const Count = (props) => {
  if(props.text === "positive")
  return (
    <>
      <p>{props.text} {props.count} %</p>
    </>
  )
  else{
    return (
      <>
        <p>{props.text} {props.count}</p>
      </>
    )    
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all,setAll] = useState(0)
  const [average,setAverage] = useState(0)
  const [positive,setPositive] = useState(0)

  const title = {
    feedback: "give feedback",
    statistics: "statistics",
  }

  const text = {
    good: "good",
    neutral: "neutral",
    bad: "bad",
    all : "all",
    average : "average",
    positive : "positive"
  }

  const handleGood = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    updateAll()
    updatePositive(updatedGood,all+1)
    updateAverage(updatedGood,neutral,bad)
  }

  const handleNeutral = () => {
    const updatedNuetral = neutral + 1
    setNeutral(updatedNuetral)
    updateAll()   
    updatePositive(good,all+1)
    updateAverage(good,neutral,bad)
  }

  const handleBad = () => {
    const updatedBad = bad + 1
    setBad(updatedBad) 
    updateAll()
    updatePositive(good,all+1)
    updateAverage(good,neutral,updatedBad)
  }

  const updateAll = ()=>{
    const updatedAll = all + 1
    setAll(updatedAll)   
  }

  const updatePositive = (good,all)=>{
    const updatedPositive = ( good / all ) * 100
    setPositive(updatedPositive)
  }

  const updateAverage = (good,neutral,bad)=>{
    const updatedAverage = ( ( good * 1 ) + ( neutral * 0 ) + ( bad * -1 ) ) / ( good + neutral + bad )
    setAverage(updatedAverage)
  }

  return (
    <div>
      <Header title={title.feedback}></Header>
      <Button text={text.good} onClick={handleGood}></Button>
      <Button text={text.neutral} onClick={handleNeutral}></Button>
      <Button text={text.bad} onClick={handleBad}></Button>
      <Header title={title.statistics}></Header>
      <Count text={text.good} count={good}></Count>
      <Count text={text.neutral} count={neutral}></Count>
      <Count text={text.bad} count={bad}></Count>
      <Count text={text.all} count={all}></Count>
      <Count text={text.average} count={average}></Count>
      <Count text={text.positive} count={positive}></Count>
    </div>
  )
}

export default App