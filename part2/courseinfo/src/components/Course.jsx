const Header = (props) => <h1>{props.course}</h1>

const Content = (props) => (
    <div>
        {props.parts.map(item => <Part key={item.id} part={item}/>)}
    </div>
)

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Course = ({course}) => {
    return(
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
        </div>
    )
}

export default Course