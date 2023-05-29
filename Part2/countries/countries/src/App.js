
import './App.css';
import { useState , useEffect} from 'react';
import axios from 'axios';

function App() {
  const [ search, setSearch ] = useState('')
  const [ countryList, setCountryList ] = useState([])


  const handleSearch =(event)=> {
    setSearch(event.target.value)
  }

  const getCountries = ()=> {
    const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
    axios
    .get(baseUrl)
    .then(country => country)
    .then(res => {
      let countries = res.data
      setCountryList(countries)
    })
    .catch(e=>console.log('error fetching data!!', e.message))
  }

  useEffect(getCountries, [])


  return (
    <div className='container'>
     <h1>Countries</h1>
     <SearchBar search={search} handleSearch={handleSearch}/>
      <ViewCountries 
        countryList={countryList} 
        search={search}
      />
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

const ViewCountries = ({countryList, search,})=> {
  if (search === ''){
    return (
      <>
        <h2>Countries...</h2>
        no data
      </>
    )
  }
  else {
    const filteredCountry = countryList.filter(country => country['name']['common'].toLowerCase().includes(search))
    return (
      <>
        <h2>Countries...</h2>
        {
          filteredCountry.map(country => <p key={country['name']['common']}>{country['name']['common']}</p>)
        }
      </>
    )
  }
}

export default App;
