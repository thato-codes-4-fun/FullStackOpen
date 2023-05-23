import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total , setTotal] = useState(0)

  const handleGood = () => {
    setGood(good+1);
    setTotal(total+1)

  }

  const handleNuetral = () => {
    setNeutral(neutral+1);
    setTotal(total+1)
  }

  const handleBad = () => {
    setBad(bad+1);
    setTotal(total+1)
  }

  const getPositive=()=> {
    if (total === 0){
      return 0;
    }
    return (good/total)*100;
  }

  const getAverage = ()=> {
    if (total === 0) {
      return 0;
    }
    return (good - bad) / total
  }



  return (
    <div>
      <Header />
      <Button handlepress={handleGood} string={'good'}/>
      <Button handlepress={handleNuetral} string={'neutral'} />
      <Button handlepress={handleBad} string={'bad'}/>
      <h2>Statistics</h2>

      <p>Good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>

      <p>all {total}</p>
      <p>average {getAverage()}</p>
      <p>positive {getPositive()}  %</p>
    </div>
  )
}

const Header = ()=> <h1>Give Feedback</h1>

const Button = ({handlepress, string})=> {
  return <button onClick={handlepress}>{string}</button>
}



export default App

