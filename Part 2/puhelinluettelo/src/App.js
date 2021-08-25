import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/filter'
import PersonForm from './components/personform'
import Persons from './components/persons'


const App = () => {
  const [persons, setPersons] = useState([])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')
  const [showAll, setShowAll] = useState(true)


  useEffect(() => {
    axios
    .get('http://localhost:3010/persons')
      .then(response => {
        const persons = response.data
        console.log(persons)
        setPersons(persons)

      })
  }, [0])

  const personsToShow = showAll
  ? persons
  : persons.filter(item => (
      item.name.toLowerCase().includes(newSearch)
    ));


  const addPerson = (e) => {
    e.preventDefault()
    if(persons.some(e => e.name === newName)){
      alert(`${newName} is already added to phonebook`);
    }

    else{
      const personObject = {
        name: newName,
        number: newNumber,
      }
      setPersons(persons.concat(personObject))

    }
    setNewName('')

  }

  const nameChangeHandler = (e) => {
    console.log(e.target.value)
    setNewName(e.target.value)
  }
  const numberChangeHandler = (e) => {
    console.log(e.target.value)
    setNewNumber(e.target.value)
  }

  const searchHandler = (e) => {
    let newValue = e.target.value

    if(newValue.length){
      setShowAll(false);
    }else{
      setShowAll(true)
    }
    console.log(newValue)
    setNewSearch(newValue);
    console.log(persons.filter(item => (
      item.name.includes(newSearch)
    )))
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter searchHandler={searchHandler} newSearch={newSearch} />
      <h3>Add a new</h3>
      <PersonForm
        numberChangeHandler={numberChangeHandler}
        nameChangeHandler={nameChangeHandler}
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App