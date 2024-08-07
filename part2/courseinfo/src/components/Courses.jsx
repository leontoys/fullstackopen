//Header
const Header = ({ header }) => {
    return (
      <h1>{header}</h1>
    )
  }
  
  //Part - shows name and exercises
  const Part = ({ part }) => { 
    return (
    <p>{part.name} {part.exercises}</p>
  ) }
  
  //Sums up the exercises using reduce
  const Total = ({parts}) =>{
    return(
      <div>
        <h2>total of {parts.reduce((sum, current) => sum + current.exercises, 0)} exercises</h2>
      </div>
    )
  }
  
  //Content -> Part + Total
  const Content = ({ parts }) => {
    return (
      <div>
        {parts.map(part => 
        <Part key={part.id} part={part} /> 
        )}
        <Total parts={parts}></Total>
      </div>
    )
  }
  
  //Course -> Header + Content
  const Course = ({ course }) => {
    return (
      <>
        <Header header={course.name}></Header>
        <Content parts={course.parts}></Content>
      </>
    )
  }
  
  //Renders each Course
  const Courses = ({ courses }) => {
    return (
      <div>
        {courses.map(course => 
        <Course key={course.id} course={course} /> 
        )}
      </div>
    )
  }

  
export default Courses