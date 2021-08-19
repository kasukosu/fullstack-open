import React, { useState, useEffect } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  // const [votes, setVotes] = useState([])
  // let array = Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf,0);
  const [votes, setVotes] = useState([])

  const [popular, setPopular] = useState(0);

  const getRandomAnecdote = () => {
    let oldValue = selected;
    let newValue = [Math.floor(Math.random() * anecdotes.length)];
    if(newValue === oldValue){
      getRandomAnecdote();
    }else{
      setSelected(newValue);

    }
    console.log(votes);
  }




  const voteAnecdote = () => {
    let copy = [...votes];

    copy[selected] = ++copy[selected];
    console.log(votes);

    setVotes(copy);

    let i = copy.indexOf(Math.max(...copy));
    setPopular(i);

  }
  useEffect(() => {
    setVotes(Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf,0));

  }, [0]);

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <p>has { [votes[selected]]}</p>

      <button onClick={() => voteAnecdote()}>vote</button>
      <button onClick={() => getRandomAnecdote()}>next anecdote</button>

      <h1>Anecdote with most votes</h1>
      {anecdotes[popular]}
      <p>has { [votes[popular]]}</p>
    </div>
  )
}

export default App