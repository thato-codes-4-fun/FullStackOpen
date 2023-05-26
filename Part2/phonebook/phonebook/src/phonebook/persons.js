
  

  
  const Persons = ({searchList, persons}) => {
    return (
      searchList.length != 0 ? searchList.map((person)=> <p key={person.name}>{person.name}    {person.number}</p>):
      persons.map((person)=> <p key={person.name}>{person.name}    {person.number}</p>)
    )
  }

  
export default  Persons