const Header = (props) => <h1>{props.course}</h1>

const Content = (props) => <>
    {props.parts.map(item => <Part key={item.id} part={item}/>)}
    <b>Total of {props.parts.reduce((sum, item) => sum + item.exercises, 0)} exercises</b>
</>

const Part = (props) => <p>{props.part.name} {props.part.exercises}</p>

const Course = ({course}) => {
    return <>
        <Header course={course.name} />
        <Content parts={course.parts} />
    </>
}

export default Course