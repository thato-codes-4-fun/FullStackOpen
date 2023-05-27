import { useState, useEffect } from 'react'
import Filter  from './phonebook/filter'
import PersonForm  from './phonebook/personsform'
import Persons  from './phonebook/persons'
import axios from 'axios'
import personApi from './services/api'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [ newName, setNewName ]  = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setSearch ] = useState('')
  const [ searchList , setSearchList ] = useState([])

  const handleNameChange = (event)=> {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const hook = ()=> {
    console.log('effect')
    personApi
    .getAll()
    .then(initPersons=> {
      setPersons(initPersons)
    })
  }

  useEffect(hook, [])

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
    const isPresent = checkName(persons, newName);
    if (!isPresent){
      const person = {
        name: newName,
        number: newNumber
      }
      personApi
      .addToPhoneBook(person)
      .then(data=> {
        setPersons(persons.concat(data))
        setNewName('')
        setNewNumber('')
      })
      
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

      <Filter search={search} handleSearch={handleSearch}/>
      <h3>Add a new</h3>
      <PersonForm 
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
        submitName={submitName}
      />

      <h2>Numbers</h2>
      <Persons searchList={searchList} persons={persons}/>
    </div>
  )
}




export default App