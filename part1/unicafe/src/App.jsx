import { useState } from 'react'

//Header component -- renders the title passed as h1
const Header = ({ title }) => {
  return (
    <h1>{title}</h1>
  )
}

//Button - for each button
const Button = ({onClick,text}) => {
  return (
    <>
      <button onClick={onClick}>{text} </button>
    </>
  )
}

//Use Button and display all the buttons
const Buttons = ({text,handlers}) => {
  return (
    <>
      <Button text={text.good}    onClick={handlers.handleGood}></Button>
      <Button text={text.neutral} onClick={handlers.handleNeutral}></Button>
      <Button text={text.bad}     onClick={handlers.handleBad}></Button>
    </>
  )
}

//Statistics Line
const StatisticLine = (props) => {
  //For positive -- show %
  if (props.text === "positive")
    return (
      <>
        <tr>
          <td>{props.text}</td>
          <td> {props.count} %</td>
        </tr>
      </>
    )
  else {
    return (
      <>
        <tr>
          <td>{props.text}</td>
          <td> {props.count}</td>
        </tr>
      </>
    )
  }
} 

//Show all statistics
const Statistics = (props) => {
  //If no feedback given, then show message
  if (props.statistics.all === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  else { //If feedbacks are given, then show statistics
    return (
      <div>
        <table>
          <tbody>
          <StatisticLine text={props.text.good} count={props.statistics.good}></StatisticLine>
          <StatisticLine text={props.text.neutral} count={props.statistics.neutral}></StatisticLine >
          <StatisticLine text={props.text.bad} count={props.statistics.bad}></StatisticLine>
          <StatisticLine text={props.text.all} count={props.statistics.all}></StatisticLine >
          <StatisticLine text={props.text.average} count={props.statistics.average}></StatisticLine >
          <StatisticLine text={props.text.positive} count={props.statistics.positive}></StatisticLine>
          </tbody>
        </table>
      </div>
    )
  }
}

//Main App
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  //Titles
  const title = {
    feedback: "give feedback",
    statistics: "statistics",
  }

  //Texts
  const text = {
    good: "good",
    neutral: "neutral",
    bad: "bad",
    all: "all",
    average: "average",
    positive: "positive"
  }

  //Statistics variables
  const statistics = {
    good: good,
    neutral: neutral,
    bad: bad,
    all: all,
    average: average,
    positive: positive
  }

  //update good 
  const handleGood = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    updateAll(updatedGood, neutral, bad)
    updatePositive(updatedGood, neutral, bad)
    updateAverage(updatedGood, neutral, bad)
  }

  //update neutral
  const handleNeutral = () => {
    const updatedNuetral = neutral + 1
    setNeutral(updatedNuetral)
    updateAll(good, updatedNuetral, bad)
    updatePositive(good, updatedNuetral, bad)
    updateAverage(good, updatedNuetral, bad)
  }

  //update bad
  const handleBad = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    updateAll(good, neutral, updatedBad)
    updatePositive(good, neutral, updatedBad)
    updateAverage(good, neutral, updatedBad)
  }

  //Event Handlers
  const eventHanlders = {
    handleGood: handleGood,
    handleNeutral: handleNeutral,
    handleBad: handleBad
  }

  //update all count
  const updateAll = (good, neutral, bad) => {
    const updatedAll = good + neutral + bad
    setAll(updatedAll)
  }

  //update positive score
  const updatePositive = (good, neutral, bad) => {
    const updatedPositive = (good / (good + neutral + bad)) * 100
    setPositive(updatedPositive)
  }

  //update average score
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