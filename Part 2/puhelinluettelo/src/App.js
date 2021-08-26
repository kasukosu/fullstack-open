import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './index.css'
import Filter from './components/filter'
import PersonForm from './components/personform'
import Persons from './components/persons'
import personService from './moduls/personservice'
import Notification from './components/notification'
const App = () => {
  const [persons, setPersons] = useState([])

  const [ newName, setNewName ] = useState('')
  const [ addedPerson, setAddedPerson ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    personService.getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [0])

  const personsToShow = showAll
  ? persons
  : persons.filter(item => (
      item.name.toLowerCase().includes(newSearch)
    ));


  const addPerson = (e) => {
    e.preventDefault()
    const person = persons.find(e => e.name === newName);
    if(person){
      alert(`${newName} is already added to phonebook`);

      if(window.confirm(`${newName} is already on the list. Update the number?`)){
        const personObject = {
          name: newName,
          number: newNumber,
        }
        personService.update(person.id, personObject)
        .then(updated => {
          setNewName('')
          setMessage(`Updated: ${personObject.name} - ${personObject.number}`);
          setErrorMessage('')
          personService.getAll()
          .then(initialPersons => {
            setPersons(initialPersons)
          })
        })
        .catch(error => {
          setErrorMessage(`person '${person.name}' was already deleted from server`)
          setMessage('');
          setPersons(persons.filter(p => p.id !== person.id))
        })
      }
    }

    else{
      const personObject = {
        name: newName,
        number: newNumber,
      }

      personService.create(personObject)
      .then(returnedPerson => {
        if(returnedPerson){
          setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setMessage(`Added ${personObject.name}`);
        setErrorMessage('');
        }else{
          setErrorMessage(`person '${person.name}' was already added to server`)
          setMessage('');
          personService.getAll()
            .then(initialPersons => {
              setPersons(initialPersons)
            })
        }


      })

    }

  }

  const removePerson = (person) => {
    console.log(person)
    const id = person.id;
    const name = person.name;
    if(window.confirm(`Delete ${name}`)){
      personService.remove(id)
      .then(updatedPersons => {
        console.log(updatedPersons);
        setPersons(persons.filter(p => p.id !== id))
        setMessage(`Deleted ${name}`);

      })
    }
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
    <main className="container">
      <h2>Phonebook</h2>

      {errorMessage &&
        <Notification status={'error'} message={errorMessage}/>
      }

      {message &&
        <Notification status={'success'} message={message}/>
      }

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
      <Persons persons={personsToShow} removePerson={removePerson} />
    </main>
  )
}

export default App