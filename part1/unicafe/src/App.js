import { useState } from 'react';
import './App.css';

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [feedbackGiven, setfeedbackGiven] = useState(false);

  const incrementGood = () => {
    const goodClicks = good + 1;
    setGood(goodClicks)
    if (feedbackGiven === false) {
      setfeedbackGiven(true)
    }
  };

  const incrementNeutral = () => {
    const neutralClicks = neutral + 1;
    setNeutral(neutralClicks)
    if (feedbackGiven === false) {
      setfeedbackGiven(true)
    } 
  };

  const incrementBad = () => {
    const badClicks = bad + 1;
    setBad(badClicks)
    if (feedbackGiven === false) {
      setfeedbackGiven(true)
    }
  };

  return (
    <>
      <Header />
      <Button name={'good'} funcRef={incrementGood} />
      <Button name={'neutral'} funcRef={incrementNeutral} />
      <Button name={'bad'} funcRef={incrementBad} />
      <Statistics numGood={good} numNeutral={neutral} numBad={bad} feedbackGiven={feedbackGiven} />
    </>
  )
};
export default App;

const Header = () => {
  return (
    <>
      <h1>give feedback</h1>
    </>
  )
};

const Button = ({ name, funcRef }) => {
  return (
    <>
      <button onClick={funcRef}>{name}</button>
    </>
  )
};

const StatisticLine = ({ statName, statValue, units }) => {
  return (
    <>
      <tr>
        <td>{statName}</td>
        <td>{statValue}</td>
        <td>{units}</td>
      </tr>
    </>
  )
}

const Statistics = ( {numGood, numNeutral, numBad, feedbackGiven} ) => {
  const all = numGood + numNeutral + numBad;
  const avg = (numGood - numBad)/all;
  const pos = (numGood/all)*100;

  if (!feedbackGiven) {
    return (
      <>
        <table>
          <tbody>
            <tr>
              <td>No feedback given yet. Click above buttons to provide feedback and calculate statistics.</td>
            </tr>
          </tbody>
        </table>
      </>
    )
  }
  else {
    return (
      <>
        <h1>Statistics</h1>
        <table>
          <tbody>
            <StatisticLine statName={'good'} statValue={numGood} units={''} />
            <StatisticLine statName={'neutral'} statValue={numNeutral} units={''} />
            <StatisticLine statName={'bad'} statValue={numBad} units={''} />
            <StatisticLine statName={'all'} statValue={all} units={''} />
            <StatisticLine statName={'average'} statValue={avg} units={''} />
            <StatisticLine statName={'positive'} statValue={pos} units={'%'} />
          </tbody>
        </table>
      </>
    )
  }
};