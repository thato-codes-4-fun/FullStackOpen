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
    return (good/total)*100;
  }

  const getAverage = ()=> {
    return (good - bad) / total
  }
  return (
    <div>
      <Header />
      <Button handlepress={handleGood} string={'good'}/>
      <Button handlepress={handleNuetral} string={'neutral'} />
      <Button handlepress={handleBad} string={'bad'}/>
      <h2>Statistics</h2>
      {
      total ===0 ? <p>No feedback given</p> :
      <table>
        <tbody>
          <tr>
            <td><StatisticLine text={'good'} value={good}/></td>
          </tr>
          <tr>
            <td><StatisticLine text={'neutral'} value={neutral}/></td>
          </tr>
          <tr>
            <td><StatisticLine text={'bad'} value={bad}/></td>
          </tr>
          <tr>
            <td><Statistics total={total} getAverage={getAverage} getPositive={getPositive}/></td>
          </tr>
        </tbody>
      </table>
      }
    </div>
  )
}

const Header = ()=> <h1>Give Feedback</h1>

const Button = ({handlepress, string})=> {
  return <button onClick={handlepress}>{string}</button>
}

const Statistics = ({total, getAverage, getPositive})=> {
  return (
    <>
      <p>all {total}</p>
      <p>average {getAverage()}</p>
      <p>positive {getPositive()}  %</p></>
  )
}

const StatisticLine = ({text, value})=> {
  return (
    <p>{text} {value}</p>
  )
}



export default App

