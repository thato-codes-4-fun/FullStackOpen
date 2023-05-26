import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' , number: '0817890019'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber ] = useState('')

  const handleNameChange = (event)=> {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log('the number is ', event.target.value)
    setNewNumber(event.target.value)
  }

  const checkName = (persons, newName) => {
    let isPresent = false
    for (let i = 0; i < persons.length; i++){
      if (persons[i]['name']===newName){
        isPresent = true;
      }
    }
    return isPresent;
  }

  const submitName = (event)=> {
    event.preventDefault();
    console.log('->',newName)
    const isPresent = checkName(persons, newName);
    console.log(isPresent)
    if (!isPresent){
      const person = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(person))
      setNewName('');
    }
    else {
      window.alert(`${newName} is aready added to phonebook`)
    }

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={submitName}>
        <div>
          name: <input
              value={newName}
              onChange={handleNameChange}
              required
          />
        </div>
        <div>
          number: <input
              value={newNumber}
              onChange={handleNumberChange}
              required
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        persons.map((person)=> <p key={person.name}>{person.name}    {person.number}</p>)
      }
    </div>
  )
}

export default App