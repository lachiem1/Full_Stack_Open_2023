const Header = ({ course }) => {
    return (
      <h1>{course}</h1>
    )
}
    
const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const Part = ({ part }) => 
    <p>
    {part.name} {part.exercises}
    </p>

const Content = ({ parts }) => {
    return (
    <>
        {parts.map(p => 
            <Part key={p.id} part={p} />
        )}
    </>
    )
}

const Course = ({course}) => {
    // console.log(course)
    const total = course.parts.reduce((sum, part) => sum + part.exercises, 0)
    
    return (
      <>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total sum={total} />
      </>
    )
  }

  export default Course