import { useState, useEffect } from 'react'

import Filter from './components/Filter';

import PersonForm from './components/PersonForm'; 

import Persons from './components/Persons';

import axios from 'axios'

const App = () => {
  //state 
  const [persons,setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter,setNewFilter] = useState('')

  //useeffect
      useEffect(() => {
      axios
        .get('http://localhost:3001/persons')
        .then(response => {
          setPersons(response.data)
        })
    }, [])


  //on form submit
  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number : newNumber
    }

    //check if the person exists in the array of objects
    let personAdded = false
    //loop through and check if the person is already added
    persons.forEach(person => {
      if (areTheseObjectsEqual(newPerson, person)) {
        personAdded = true
        return
      }
    }
    )
    if (personAdded) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      //add new person object
      axios
      .post('http://localhost:3001/persons', newPerson)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')   })
    }
  }

  //reads the name from the input field and sets
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  //reads the number from the input field and sets
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }  

  //handles filtering
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }  

  //utitlity function to compare objects
  function areTheseObjectsEqual(first, second) {
    const al = Object.getOwnPropertyNames(first);
    const bl = Object.getOwnPropertyNames(second);

    // Check if the two list of keys are the same
    // length. If they are not, we know the objects
    // are not equal.
    if (al.length !== bl.length) return false;

    // Check that all keys from both objects match
    // are present on both objects.
    const hasAllKeys = al.every((value) => !!bl.find((v) => v === value));

    // If not all the keys match, we know the
    // objects are not equal.
    if (!hasAllKeys) return false;

    // We can now check that the value of each
    // key matches its corresponding key in the
    // other object.
    for (const key of al) if (first[key] !== second[key]) return false;

    // If the object hasn't return yet, at this
    // point we know that the objects are the
    // same
    return true;
  }

  //case insensitive filter
  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))   

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} ></Filter>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange}>
      </PersonForm>
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow}></Persons>
    </div>
  )
}

export default App