import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [ newName, setNewName ]  = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setSearch ] = useState('')
  const [ searchList , setSearchList ] = useState([])

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
        break;
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

  const handleSearch= (event) => {
    console.log(event.target.value)
    setSearch(event.target.value)
    let searchItem = persons.filter(person => person.name.toLowerCase().includes(event.target.value))
    setSearchList(searchItem)
    
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <div>
        search: <input
            value={search}
            onChange={handleSearch}
          />
      </div>

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
        searchList.length != 0 ? searchList.map((person)=> <p key={person.name}>{person.name}    {person.number}</p>):
        persons.map((person)=> <p key={person.name}>{person.name}    {person.number}</p>)
      }
    </div>
  )
}

export default App