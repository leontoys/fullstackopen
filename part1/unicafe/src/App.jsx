import { useState } from 'react'

const Header = ({title})=>{
  return (
      <h1>{title}</h1>
  )
}

const Button = (props)=>{
  return (
    <>
      <button onClick={props.onClick}>{props.text} </button>
    </>
  )
}

const Count = (props)=>{
  return (
    <>
      <p>{props.text} {props.count}</p>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const title = {
    feedback : "give feedback",
    statistics : "statistics",
  }

  const text = {
    good : "good",
    neutral : "neutral",
    bad : "bad"
  }

  const handleGood = ()=>{
    const updatedGood = good + 1
    setGood(updatedGood)
  }

  const handleNeutral = ()=>{
    const updatedNuetral = neutral + 1
    setNeutral(updatedNuetral)    
  }
  
  const handleBad = ()=>{
    const updatedBad = bad + 1
    setBad(updatedBad)   
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
    </div>
  )
}

export default App