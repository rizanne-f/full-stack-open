import { useState, useEffect } from "react"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import personsService from "./services/persons.js"
import Notification from "./components/Notification.jsx"
import './index.css'

const App = () => {
  const [persons, setPersons] = useState(null)
  const [newContact, setNewContact] = useState({name: '', number: ''})
  const [searchValue, setSearch] = useState('')
  const [notif, setNotif] = useState({message: null, isError: true})

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  // do not render anything if notes is null
  if (!persons) { return null }

  const clearNotif = () => {
    setTimeout(() => {
      setNotif({ message: null, isError: false })
    }, 5000)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const existingContact = persons.find(person => person.name === newContact.name)
    const newObject = { ...existingContact, number: newContact.number }

    if (persons.map(person => person.name).includes(newContact.name)) {
      const updatedContact = confirm(
        `${newContact.name} is already added to phonebook, replace the old number with a new one?`
      )

      if (updatedContact) {
        personsService
          .update(existingContact.id, newObject).then(updatedPerson => {
            setPersons(persons.map(
              person => person.id === existingContact.id
              ? updatedPerson
              : person)
            )
            setNotif({
              message: `${existingContact.name} was updated to ${newContact.number}.`,
              isError: false
            })
            clearNotif()
          }).catch(() => {
            setNotif({
              message: `Information of ${existingContact.name} has already been removed from server.`,
              isError: true
            })
            clearNotif()
            setPersons(persons.filter(p => p.id !== existingContact.id))
          })
      }
    } else {
      personsService
        .create(newContact)
        .then(insertedContact => setPersons(persons.concat(insertedContact)))

      setNotif({
        message: `Added ${newContact.name}.`,
        isError: false
      })
      clearNotif()
    }

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

  const handleDeletePerson = (person) => () => {
    const updatedPersons = persons.filter(p => p.id !== person.id)
    
    if (confirm(`Delete ${person.name}?`)) {
      setPersons(updatedPersons)

      personsService
        .deletePerson(person.id).then(response => {
          setNotif({
            message: `${response.name} is deleted from server.`,
            isError: false
          })
          clearNotif()
        }).catch(() => {
          setNotif({
            message: `${person.name} is already deleted from server.`,
            isError: true
          })
          clearNotif()
          setPersons(persons.filter(p => p.id !== person.id))
        })
    }
  }

  const filteredPersons = searchValue
    ? persons.filter(person => person.name.toLowerCase().includes(searchValue))
    : persons
  

  return <div>
    <h2>Phonebook</h2>
    <Notification notif={notif}/>
    <Filter handleSearch={handleSearch}/>

    <h3>Add a new contact</h3>
    <PersonForm 
      newContact={newContact}
      addPerson={addPerson}
      handleSetNewName={handleSetNewName}
      handleNewNumber={handleNewNumber}
    />

    <h3>Numbers</h3>
    <Persons
      filteredPersons={filteredPersons}
      handleDeletePerson={handleDeletePerson}/>
  </div>

}

export default App