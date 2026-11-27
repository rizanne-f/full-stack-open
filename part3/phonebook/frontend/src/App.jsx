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
    
    const existing = persons.find(p =>
      p.name.trim().toLowerCase() === newContact.name.trim().toLowerCase()
    )

    // If name already exists
    if (existing) {
      const modified = { ...existing, number: newContact.number.trim() }

      // Ask user to modify number else do nothing
      if (confirm(
        `${existing.name} is already added to phonebook, replace the old number with a new one?`
      )) {
        personsService
          .update(existing.id, modified)
          .then(updated => {
            setPersons(persons.map(p => p.id === existing.id ? updated : p))

            // Show sucess notification
            setNotif({
              message: `${existing.name} was updated to ${newContact.number}.`,
              isError: false
            })
            clearNotif()
          }).catch(() => {
            setNotif({
              message: `Information of ${existing.name} has already been removed from server.`,
              isError: true
            })
            clearNotif()
            setPersons(persons.filter(p => p.id !== existing.id))
          })
      }

      setNewContact({name: '', number: ''})
      return
    }

    // Add a new person object
    const newPersonObj = { name: newContact.name, number: newContact.number, }

    personsService
      .create(newPersonObj)
      .then(newPerson => {
        setPersons(persons.concat(newPerson))
        setNewContact({name: '', number: ''})

        // Show notification
        setNotif({
          message: `Added ${newPerson.name}`,
          isError: false
        })
        clearNotif()
      })
      .catch(error => {
        console.log(error.response.data.error)
        setNotif({
          message: error.response.data.error,
          isError: true
        })
        clearNotif()
      })

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
            message: `${person.name} is deleted from server.`,
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