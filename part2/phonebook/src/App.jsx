import { useState } from "react"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newContact, setNewContact] = useState({
    name: '', number: ''
  })

  const [searchValue, setSearch] = useState('')

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