import { useState, useEffect } from "react"
import axios from 'axios'
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newContact, setNewContact] = useState({name: '', number: ''})
  const [searchValue, setSearch] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(response => (
      setPersons(response.data)
    ))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    persons.map(person => person.name).includes(newContact.name)
    ? alert(`${newContact.name} is already added to phonebook`) 
    : setPersons(persons.concat(newContact))
    setNewContact({name: '', number: ''})
  }

  const handleSetNewName = (event) => (
    setNewContact({...newContact, name: event.target.value})
  )
  
  const handleNewNumber = (event) => (
    setNewContact({...newContact, number: event.target.value})
  )

  const handleSearch = (event) => {
    setSearch(event.target.value.toLowerCase())
  }

  const filteredPersons = searchValue
    ? persons.filter(person => person.name.toLowerCase().includes(searchValue))
    : persons
  

  return <div>
    <h2>Phonebook</h2>
    <Filter handleSearch={handleSearch}/>

    <h3>Add a new contact</h3>
    <PersonForm 
      newContact={newContact}
      addPerson={addPerson}
      handleSetNewName={handleSetNewName}
      handleNewNumber={handleNewNumber}
    />

    <h3>Numbers</h3>
    <Persons filteredPersons={filteredPersons}/>
  </div>

}

export default App