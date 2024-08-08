import { useState } from 'react'

const Person = ({person }) => {
  return (
    <p>{person.name}</p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  //on form submit
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName
    }
    //add new person object
    setPersons(persons.concat(personObject))
    setNewName('')  
  }

  //reads the name from the input field and sets
  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }  

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handlePersonChange} />
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