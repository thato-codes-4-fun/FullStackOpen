import axios from 'axios';


const getCountries = ()=> {
    const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
    let request = axios
    .get(baseUrl)
    return request.then(country=> country)
    
  }

const getCountry = (country)=> {
  const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name/' + `${country}`
  const request = axios.get(baseUrl)
  return request.then(country=> country)
}


export default { getCountries, getCountry}