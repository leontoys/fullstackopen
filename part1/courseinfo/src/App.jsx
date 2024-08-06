const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Content = (props) => {
  console.log(props.content)
  return (
    <>
      <p>
        {props.content[0].part1} {props.content[0].exercises1}
      </p>
      <p>
        {props.content[1].part2} {props.content[1].exercises2}
      </p>
      <p>
        {props.content[2].part3} {props.content[2].exercises3}
      </p>
    </>
  )
}



const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.exercises[0] + props.exercises[1]  + props.exercises[2] }</p>
    </>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course}></Header>
      <Content content={[{ part1, exercises1 }, { part2, exercises2 }, { part3, exercises3 }]}></Content>
      <Total exercises={[exercises1,exercises2,exercises3]}></Total>
    </div>
  )
}

export default App