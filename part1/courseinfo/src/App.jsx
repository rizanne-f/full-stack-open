const Header = (course) => {
  console.log(course);
  return <h1>{course.title}</h1>
}

const Content = (content) => {
  console.log(content);
  return <p>{content.part} {content.exercise}</p>
}

const Total = (number) => {
  console.log(number);
  return <p>Number of exercises {number.total}</p>
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass date',
    exercises: 7
  }
  const part3 ={
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header title={course} />
      <Content part = {part1.name} exercise = {part1.exercises} />
      <Content part = {part2.name} exercise = {part2.exercises} />
      <Content part = {part3.name} exercise = {part3.exercises} />
      <Total total = {part1.exercises + part2.exercises + part3.exercises} />
    </div>
  )
}

export default App