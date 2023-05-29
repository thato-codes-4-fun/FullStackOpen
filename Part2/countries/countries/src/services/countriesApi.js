import axios from 'axios';


const getCountries = ()=> {
    const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
    let request = axios
    .get(baseUrl)
    return request.then(country=> country)
    
  }


export default {getCountries}