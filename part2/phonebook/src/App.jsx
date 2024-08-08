import { useState } from 'react'

const Person = ({ person }) => {
  return (
    <p>{person.name} {person.number}</p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number : '040-1234567' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')


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
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>        
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person =>
          <Person key={person.name} person={person} />
        )}
      </div>
    </div>
  )
}

export default App