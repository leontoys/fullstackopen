import { useState, useEffect } from 'react'

import Filter from './components/Filter';

import PersonForm from './components/PersonForm';

import Persons from './components/Persons';

import personService from "./services/persons";

import Notification from "./components/Notification";

const App = () => {
  //state 
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState({message:null,className:null})

  //useeffect
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])


  //on form submit
  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }

    //check if the person exists in the array of objects
    let personAdded = false
    let id = null
    //loop through and check if the person is already added
    persons.forEach(person => {
      if ((areTheseObjectsEqual(newPerson, person))
        || (person.name === newPerson.name)) { //added new condition to check if person exists
        //note - either add this condition or ignore id while comparing
        personAdded = true
        id = person.id
        return
      }
    }
    )
    if (personAdded) {
      //if person is already added ask
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one? `)) {
        personService
          .update(id, newPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
            //show message
            const newMessage = { 
              message : `Updated number for ${newPerson.name}`,
              className : 'notification'
            }         
            setMessage(newMessage)
            setTimeout(() => {
              const newMessage = { 
                message : null,
                className : null
              }         
              setMessage(newMessage)
            }, 5000)            
          })
          .catch(error => {         
            //Validation from backend
          const newMessage = { 
            message : `${error.response.data.error}` ,
            className : 'error'
          }                 
/*             const newMessage = { 
              message : `Information of '${newPerson.name}' has already been removed from server` ,
              className : 'error'
            }    */      
            setMessage(newMessage)          
            setTimeout(() => {
              const newMessage = { 
                message : null ,
                className : null
              }         
              setMessage(newMessage)  
            }, 5000)                  
            setPersons(persons.filter(person => person.id !== id))    })          
      }
    }
    else {
      //add new person object
      personService
        .create(newPerson)
        .then(returnedPerson => {
          console.log(returnedPerson)
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
            //show message
            const newMessage = { 
              message : `Added ${newPerson.name}` ,
              className : 'notification'
            }         
            setMessage(newMessage)              
            setTimeout(() => {
              const newMessage = { 
                message : null ,
                className : null
              }         
              setMessage(newMessage)   
            }, 5000)            
        })
        .catch(error => {     
          console.log(error.response.data.error)      
          //show message
          const newMessage = { 
            message : `${error.response.data.error}` ,
            className : 'error'
          }         
          setMessage(newMessage)          
          setTimeout(() => {
            const newMessage = { 
              message : null ,
              className : null
            }         
            setMessage(newMessage)  
          }, 5000) 
        })             
        
    }
  }

  //delete person
  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .deleteObject(id)
        .then(deletedPerson => {
          console.log('deleted',deletedPerson)
          //we will compare and remove the deleted person
          //change to based on id
          const updatedPersons = persons.filter((person)=> person.id !== id )
          console.log('updated',updatedPersons)
          //set with updated records
          setPersons(updatedPersons)
        })      
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
      <Notification message={message.message} className={message.className} />           
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} ></Filter>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange}>
      </PersonForm>
      <h2>Numbers</h2>
      <Persons deletePerson={deletePerson} personsToShow={personsToShow}></Persons>
    </div>
  )
}

export default App