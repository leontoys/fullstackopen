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

const Buttons = (props)=>{
  return(
    <>
      <Button text={props.text.good} onClick={props.handlers.handleGood}></Button>
      <Button text={props.text.neutral} onClick={props.handlers.handleNeutral}></Button>
      <Button text={props.text.bad} onClick={props.handlers.handleBad}></Button>    
    </>
  )
}

const StatisticLine = (props) => {
  if (props.text === "positive")
    return (
      <>
        <p>{props.text} {props.count} %</p>
      </>
    )
  else {
    return (
      <>
        <p>{props.text} {props.count}</p>
      </>
    )
  }
}

const Statistics = (props) => {
  if(props.statistics.all === 0){
    return(
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  else{
  return (
    <div>
     <StatisticLine text={props.text.good} count={props.statistics.good}></StatisticLine>
      <StatisticLine text={props.text.neutral} count={props.statistics.neutral}></StatisticLine >
      <StatisticLine text={props.text.bad} count={props.statistics.bad}></StatisticLine>
      <StatisticLine text={props.text.all} count={props.statistics.all}></StatisticLine >
      <StatisticLine text={props.text.average} count={props.statistics.average}></StatisticLine >
      <StatisticLine text={props.text.positive} count={props.statistics.positive}></StatisticLine> 
    </div>
  )
}
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const title = {
    feedback: "give feedback",
    statistics: "statistics",
  }

  const text = {
    good: "good",
    neutral: "neutral",
    bad: "bad",
    all: "all",
    average: "average",
    positive: "positive"
  }

  const statistics = {
    good: good,
    neutral: neutral,
    bad: bad,
    all: all,
    average: average,
    positive: positive
  }  

  const handleGood = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    updateAll(updatedGood, neutral, bad)
    updatePositive(updatedGood, neutral, bad)
    updateAverage(updatedGood, neutral, bad)
  }

  const handleNeutral = () => {
    const updatedNuetral = neutral + 1
    setNeutral(updatedNuetral)
    updateAll(good, updatedNuetral, bad)
    updatePositive(good, updatedNuetral, bad)
    updateAverage(good, updatedNuetral, bad)
  }

  const handleBad = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    updateAll(good, neutral, updatedBad)
    updatePositive(good, neutral, updatedBad)
    updateAverage(good, neutral, updatedBad)
  }

  const eventHanlders = {
    handleGood : handleGood,
    handleNeutral : handleNeutral,
    handleBad : handleBad
  }

  const updateAll = (good, neutral, bad) => {
    const updatedAll = good + neutral + bad
    setAll(updatedAll)
  }

  const updatePositive = (good, neutral, bad) => {
    const updatedPositive = (good / (good + neutral + bad)) * 100
    setPositive(updatedPositive)
  }

  const updateAverage = (good, neutral, bad) => {
    const updatedAverage = ((good * 1) + (neutral * 0) + (bad * -1)) / (good + neutral + bad)
    setAverage(updatedAverage)
  }

  return (
    <div>
      <Header title={title.feedback}></Header>
      <Buttons text={text} handlers={eventHanlders}></Buttons>
      <Header title={title.statistics}></Header>
      <Statistics text={text} statistics={statistics}></Statistics>
    </div>
  )
}

export default App