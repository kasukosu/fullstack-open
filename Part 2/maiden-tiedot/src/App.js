import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/filter'
import Countries from './components/countries'


const App = () => {

  const api_key = process.env.REACT_APP_API_KEY
  const [countries, setCountries] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        const countries = response.data
        console.log(countries)
        setCountries(countries)

      })
  }, [0])

  const countriesToShow = showAll
  ? countries
  : countries.filter(item => (
      item.name.toLowerCase().includes(newSearch)
    ));

  const showCountry = (e) => {
    console.log(e.target.value)
    setNewSearch(e.target.value.toLowerCase());
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
    console.log(countries.filter(item => (
      item.name.includes(newSearch)
    )))
  }

  return (
    <div>
      <h2>find countries</h2>
        <Filter searchHandler={searchHandler} newSearch={newSearch} />
      <h3>Countries</h3>
      {countriesToShow.length<10 ? <Countries showCountry={showCountry} countries={countriesToShow} api_key={api_key} />
        : <p>Too many matches, specify another filter</p>
      }

    </div>
  )
}

export default App