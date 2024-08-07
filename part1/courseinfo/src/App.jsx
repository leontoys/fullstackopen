//Header
const Header = ({ course }) => {
  return (
    <>
      <h1>{course}</h1>
    </>
  )
}

//Part - prints part and exercise
const Part = ({ part, exercises }) => {
  return (
    <>
      <p>
        {part} {exercises}
      </p>
    </>
  )
}


//read content one by one and calls Part to print
const Content = ({ content }) => {
  return (
    <>
      <Part part={content[0].name} exercises={content[0].exercises}></Part>
      <Part part={content[1].name} exercises={content[1].exercises}></Part>
      <Part part={content[2].name} exercises={content[2].exercises}></Part>
    </>
  )
}


//Total
const Total = ({exercises}) => {
  let total = 0
  exercises.forEach(element => {
    total += element.exercises
  });
  return (
    <>
      <p>Number of exercises {total}</p>
    </>
  )
}

const App = () => {
  //wrapped all course info into one object 
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