
import './App.css';
import { useState , useEffect} from 'react';
import countriesApi from './services/countriesApi';
import Heading from './components/heading';
import SearchBar from './components/searchBar';
import ViewCountries from './components/countriesView';


function App() {
  const [ search, setSearch ] = useState('')
  const [ countryList, setCountryList ] = useState([])


  const handleSearch =(event)=> {
    setSearch(event.target.value)
  }

  const getCountriesHook = ()=> {
    countriesApi
    .getCountries()
    .then(res=> {
      let countries = res.data
      setCountryList(countries)
    })
    .catch(e=>console.log('error fetching data!!', e.message))
  }

  useEffect(getCountriesHook, [])


  return (
    <div className='container'>
     <Heading heading={'Countries...'}/>
     <SearchBar search={search} handleSearch={handleSearch}/>
      <ViewCountries 
        countryList={countryList} 
        search={search}
      />
    </div>
  );
}

export default App;
