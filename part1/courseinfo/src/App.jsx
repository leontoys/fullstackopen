const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Part = (props)=>{
  return (
    <>
      <p>
        {props.part} {props.exercises}
      </p>    
    </>
  )
}

const Content = (props) => {
  props.content.forEach(element => {
    <Part part={element.name} exercises={element.exercises}></Part>
  });
  return (
    <>
      <Part part={props.content[0].name} exercises={props.content[0].exercises}></Part>
      <Part part={props.content[1].name} exercises={props.content[1].exercises}></Part>
      <Part part={props.content[2].name} exercises={props.content[2].exercises}></Part>      
    </>
  )
}



const Total = (props) => {
  let total = 0
  props.exercises.forEach(element => {
    total += element.exercises
  });
  return (
    <>
      <p>Number of exercises { total }</p>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }]
    }

  return (
    <div>
      <Header course={course.name}></Header>
      <Content content={course.parts}></Content>      
      <Total exercises={course.parts}></Total> 
    </div>
  )
}

export default App

{/* 
*/}