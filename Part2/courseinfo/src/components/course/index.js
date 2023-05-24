const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
  return (
    <>
    {parts.map(item=> <Part key={item.id} part={item}/>)}
    </>
  )
}


const Course = (props) => {
  const { name, parts } = props.course;
  const total = parts.reduce((acc, currentVal)=>acc+=currentVal['exercises'],0)
  return (
    <>
      <Header course={name}/>
      <Content parts={parts}/>
      <Total sum={total}/>
    </>
  )
}

export default Course