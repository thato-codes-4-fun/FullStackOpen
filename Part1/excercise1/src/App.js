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
        exercises : 7
      },
      {
        name: 'State of a component',
        exercises : 14
      }
    ]
  }

  return (
    <div>
      <Header course={course}/>
      <Content
        parts={course.parts}
      />
      <Total
        parts={course.parts}    
      />
    </div>
  )
}

const Header = (props)=> {
  return (
    <>
      <h1>{props.course.name}</h1>
    </>
  )
}

const Content = (props)=> {
  const {parts} = props
  return (
    <>
      <Part exercises={parts[0].exercises} part={parts[0].name}/>
      <Part exercises={parts[1].exercises} part={parts[1].name}/>
      <Part exercises={parts[2].exercises} part={parts[2].name}/>
    </>
  )
}

const Total = (props) => {
  const {parts} = props
  return (
    <>
       <p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p>
    </>
  )
}

const Part = ({part, exercises}) => {
  return (
    <>
      <p>
        {part} {exercises}
      </p>
    </>
  )
}

export default App