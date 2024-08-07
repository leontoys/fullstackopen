import { useState } from 'react'

const Title = ({title})=>{
  return(
    <h1>{title}</h1>
  )
}

const Button = (props)=>{
  return(
      <button onClick={props.handleClick}>{props.text}</button>
  )
}

const Anecdote = ({text})=>{
  return(
    <div>
      <p>{text}</p>
    </div>
  )
}

const Votes = ({votes})=>{
  return(
    <p>has {votes} votes</p>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))
  const [highest,setHighest] = useState(0)

  const handleClick = ()=>{
    const random = Math.floor( Math.random() * anecdotes.length )
    setSelected(random)
  }

  const handleVote = ()=>{
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
    const maxIndex = points.reduce((maxIndex, elem, i, arr) =>  elem > arr[maxIndex] ? i : maxIndex, 0)
    setHighest(maxIndex)
    }

  return (
    <div>
      <Title title={"Anecdote of the day"}></Title>
      <Anecdote text={anecdotes[selected]}></Anecdote>
      <Votes votes={points[selected]}></Votes>
      <Button handleClick={handleVote} text="vote"></Button>      
      <Button handleClick={handleClick} text="next anecdote"></Button>      
      <Title title={"Anecdote with most votes"}></Title>
      <Anecdote text={anecdotes[highest]}></Anecdote>
    </div>
  )
}

export default App