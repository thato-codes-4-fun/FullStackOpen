import { useState, useEffect } from 'react'
import Filter  from './phonebook/filter'
import PersonForm  from './phonebook/personsform'
import Persons  from './phonebook/persons'
import personApi from './services/api'
import './index.css'
import SuccessNotification from './components/successNotification'
import ErrorNotification from './components/errorNotification'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [ newName, setNewName ]  = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setSearch ] = useState('')
  const [ searchList , setSearchList ] = useState([])
  const [ errorMsg , setErrorMsg ] = useState(null);
  const [ successMsg , setSuccessMsg ] = useState(null);

  const handleNameChange = (event)=> {
    setNewName(event.target.value)
  }

  const hook = ()=> {
    personApi
    .getAll()
    .then(initPersons=> {
      setPersons(initPersons)
    })
    .catch(e=> {
      window.alert('failed to retrieve contacts please refresh page')
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
        setNewName('')
        setNewNumber('')
        setSuccessMsg(`User ${newName} has been added`)
        setTimeout(()=>setSuccessMsg(null), 2000)
        hook()
      })
      .catch(e=> {
        window.alert(`failed to submit name`)

      })
      
    }
    else {
      const shouldUpdate = window.confirm(`would you like to change ${newName} to new ${newNumber}`)
      if (shouldUpdate){
        const person = persons.find(p => p.name === newName)
        const updatedPerson = {...person, number: newNumber}
        personApi
        .updateNumber(person.id, updatedPerson)
        .then(data=>{
          hook()
          setSuccessMsg(`user ${person.name} has updated numer`)
          setTimeout(()=>setSuccessMsg(null),2000)
        })
        .catch(e => {
          window.alert(`failed to update nume`)
        })
      }
      
    }

  }

  const handleSearch= (event) => {
    console.log(event.target.value)
    setSearch(event.target.value)
    let searchItem = persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase()))
    setSearchList(searchItem)
  }

  const handleDelete = (id,name) => {
    const  shouldDelete = window.confirm(`delete with ${name} ?`)
    if (shouldDelete){
      personApi
      .deletePerson(id)
      .then(()=> {
        hook()
        setSuccessMsg(`user ${name} deleted successfully`)
        setTimeout(()=>setSuccessMsg(null),3000)
      })
      .catch(e => {
        console.log('user not found')
        setErrorMsg('user already deleted')
        setTimeout(()=> setErrorMsg(null),5000)
        
      })
    }
  }



  return (
    <div>
      <h2>Phonebook</h2>
      <ErrorNotification message={errorMsg}/>
      <SuccessNotification message={successMsg} />
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
      <Persons searchList={searchList} persons={persons} handleDelete={handleDelete}/>
    </div>
  )
}









export default App