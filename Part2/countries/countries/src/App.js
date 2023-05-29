import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [ search, setSearch ] = useState('')


  const handleSearch =(event)=> {
    setSearch(event.target.value)
  }


  return (
    <div className='container'>
     <h1>Countries</h1>
     <SearchBar search={search} handleSearch={handleSearch}/>
      <ViewCountries handleSearch={handleSearch} search={search}/>
     
    </div>
  );
}

const SearchBar = ({search, handleSearch})=> {
  return (
    <div>
      find countries 
      <input 
        value={search}
        onChange={handleSearch}
      />
   </div>
  )
}

const ViewCountries = ()=> {
  return (
    <>
      <h2>Showing countries...</h2>
    </>
  )
}

export default App;
