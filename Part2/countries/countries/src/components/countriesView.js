
const ViewCountries = ({countryList, search,})=> {
    if (search === ''){
      return (
        <>
          <h2>Country List</h2>
          no data
        </>
      )
    }
    else {
      const filteredCountry = countryList.filter(country => country['name']['common'].toLowerCase().includes(search))
      return (
        <>
          <h2>Country List</h2>
          {
            filteredCountry.map(country => <p key={country['name']['common']}>{country['name']['common']}</p>)
          }
        </>
      )
    }
  }


export default ViewCountries
