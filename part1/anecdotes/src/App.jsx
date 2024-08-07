import { useState } from 'react'

//Title
const Title = ({title})=>{
  return(
    <h1>{title}</h1>
  )
}

//Button
const Button = ({handleClick,text})=>{
  return(
      <button onClick={handleClick}>{text}</button>
  )
}

//Anectode line
const Anecdote = ({text})=>{
  return(
    <div>
      <p>{text}</p>
    </div>
  )
}

//Show votes for the anecdote
const Votes = ({votes})=>{
  return(
    <p>has {votes} votes</p>
  )
}

//Main App Component
const App = () => {
  //list of anecdotes
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
   
  //state variables
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))
  const [highest,setHighest] = useState(0)

  //handle next anecdote
  const handleClick = ()=>{
    //get a random number and update the selection
    const random = Math.floor( Math.random() * anecdotes.length )
    setSelected(random)
  }

  //handle vote
  const handleVote = ()=>{
    //copy the selection and update the vote count
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
    //get the index of the anecdote with the maximum number of votes
    const maxIndex = copy.reduce((maxIndex, elem, i, arr) =>  elem > arr[maxIndex] ? i : maxIndex, 0)
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