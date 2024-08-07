const Header = ({ header }) => {
  return (
    <h1>{header}</h1>
  )
}

const Part = ({ part }) => { 
  return (
  <p>{part.name} {part.exercises}</p>
) }

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => 
      <Part key={part.id} part={part} /> 
      )}
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <>
      <Header header={course.name}></Header>
      <Content parts={course.parts}></Content>
    </>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App