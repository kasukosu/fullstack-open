import React, { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  let clickGood = (e) => {
    setGood(good + 1);
  }
  let clickNeutral = (e) => {
    setNeutral(neutral + 1);
  }
  let clickBad = (e) => {
    setBad(bad + 1);
  }

  return (
    <div>
      <div>
        <h1>Give Feedback</h1>
        <Button clickHandler={clickGood} text="Good"/>
        <Button clickHandler={clickNeutral} text="Neutral"/>
        <Button clickHandler={clickBad} text="Bad"/>
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />

    </div>
  )
}

export default App


const Statistics = ({good,neutral,bad}) => {
  return (
    <div>
        {(good||bad||neutral) ?
          <div>
            <h1>Statistics</h1>
            <StaticLine text="good" value = {good}/>
            <StaticLine text="neutral" value = {neutral}/>
            <StaticLine text="bad" value = {bad}/>
            <StaticLine text="total" value = {good+neutral+bad}/>
            <StaticLine text="average" value = {((good*1)+(bad*-1)+(neutral*0))/(good+neutral+bad)}/>
          </div>
          :
          <p>No feedback given</p>
        }
    </div>
   );
}

const StaticLine = ({text, value}) => {

  return (
      <p>{text}: {value}</p>
   );
}

const Button = ({clickHandler, text}) => {
  return (

      <button onClick={clickHandler}>{text}</button>

  );
}

