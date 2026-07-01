import { useState, useEffect } from 'react'
import axios from 'axios'
import CountryView from './components/CountryView'
import Countries from './components/Countries'

function App() {
  const [countries, setCountries] = useState([])
  const [searchInput, setSearchInput] = useState('')
  
  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])
  
  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value)
  }

  const filteredResult = searchInput
    ? countries.filter(country => (
      country.name.common
        .toLowerCase()
        .includes(searchInput.toLowerCase())
    ))
    : countries

  const handleShowClicked = (country) => () => {
    setSearchInput(country)
  }

  return (
    <div>
      <h1>Countries</h1>
      Find countries: <input value={searchInput} onChange={handleSearchInputChange} />
      
      <div>
        {
          (filteredResult.length > 10) ? (
            "Too many matches, specify another filter"
          ) : (filteredResult.length === 1) ? (
            <CountryView filteredResult={filteredResult} />
          ) : (
            <Countries filteredResult={filteredResult} handleShowClicked={handleShowClicked} />
          )
        }
      </div>
    </div>
  )
}

export default App
