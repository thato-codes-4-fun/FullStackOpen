
const Persons = ({searchList, persons, handleDelete}) => {
    return (
      searchList.length !== 0 ? searchList.map((person)=> <PersonDetail key={person.name} name={person.name} number={person.number} id={person.id}/>):
      persons.map((person)=> <PersonDetail key={person.name} name={person.name} number={person.number} id={person.id} handleDelete={handleDelete}/>)
    )
}


const PersonDetail = ({name, number, id, handleDelete}) => {
  return (
    <>
      <p>{name} {number} <button onClick={()=>handleDelete(id, name)}>delete</button></p> 
    </>
  )
}



  
export default  Persons