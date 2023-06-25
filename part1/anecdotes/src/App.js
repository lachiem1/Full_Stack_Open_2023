import { useState, useEffect } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({})
  const [maxIndex, setMaxIndex] = useState(null)

  useEffect(() => {
    updateMaxIndex()
  }, [votes]);

  const updateAnecdote = () => {
    const currSelected = selected;
    // update index to next element or return to start of array if at end
    if (currSelected < anecdotes.length-1) {
      setSelected(currSelected + 1)
    }
    else {
      setSelected(0)
    }
  };

  const updateVotes = (key) => {
    const keyStr = key.toString();
    let newCount;
    if (keyStr in votes) {
      newCount = votes[key.toString()] + 1;
    } else {
      newCount = 1;
    }
    setVotes({...votes, [keyStr]: newCount})
  };

  const updateMaxIndex = () => {
    let maxObjKey = null;
    let maxObjVal = 0;

    for (let key in votes) {
      if (votes[key] > maxObjVal) {
        maxObjVal = votes[key];
        maxObjKey = key;
      }
    }
    if (maxObjKey !== null) {
      const keyAsInt = parseInt(maxObjKey, 10);
      setMaxIndex(keyAsInt)
    }
  };

  return (
    <>
    <div>
      <h4>{anecdotes[selected]}</h4>
      <VoteInfo numVotes={votes[selected.toString()]} />
    </div>
    <div>
      <Button name={'vote'} funcRef={() => {updateVotes(selected)}} />
      <Button name={'next anecdote'} funcRef={updateAnecdote} />
    </div>
    <div>
      <h5>{maxIndex !== null ? anecdotes[maxIndex] : 'No votes recorded yet'}</h5>
      <VoteInfo numVotes={maxIndex !== null ? votes[maxIndex.toString()] : undefined} />
    </div>
    </>
  )
}

export default App

const Button = ({ name, funcRef }) => {
  return (
    <>
      <button onClick={funcRef}>{name}</button>
    </>
  )
}

const VoteInfo = ({ numVotes }) => {
  if (numVotes !== undefined) {
    return (
      <>
        <p>Current anecdote has <strong>{numVotes}</strong> votes</p>
      </>
    )
  } else {
    return (
      <>
        <p>Current anecdote has <strong>0</strong> votes</p>
      </>
    )
  }
}