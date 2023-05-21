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
      <Header course={course}/>
      <Content
        part1={part1}
        part2={part2}
        part3={part3}
        exercises1={exercises1}
        exercises2={exercises2}
        exercises3={exercises3}
        
      />
      <Total
        exercises1={exercises1}
        exercises2={exercises2}
        exercises3={exercises3}      
      />
    </div>
  )
}

const Header = (props)=> {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Content = (props)=> {
  const {
    part1,
    part2,
    part3,
    exercises1,
    exercises2,
    exercises3
  } = props;
  return (
    <>
      <Part exercises={exercises1} part={part1}/>
      <Part exercises={exercises2} part={part2}/>
      <Part exercises={exercises3} part={part3}/>
    </>
  )
}

const Total = ({exercises1, exercises2, exercises3}) => { 
  return (
    <>
       <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
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