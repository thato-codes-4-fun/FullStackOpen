
const ViewCountries = ({countryList, search, getCountry, country})=> {

    const handleDetailPress = (countryName)=> {
        getCountry(countryName)
    }

    if (search === ''){
      return 
    }
    else {
      const filteredCountry = countryList.filter(country => country['name']['common'].toLowerCase().includes(search))
      if(filteredCountry.length > 10){
        return (
        <>
            <h1>Countries list</h1>
            <p>Too many matches, specify another field</p>
        </>
        )
      }
      else if (filteredCountry.length === 1){
        const extractCountry = filteredCountry[0]
        return (
           <DetailCountryView extractCountry={extractCountry} />
        )

      }
      else if (country !== null) {
          return <DetailCountryView extractCountry={country}/>  
      } 
      return (
        <>
          <h2>Country List</h2>
          {
            filteredCountry.map(country => {
                return (
                    <div key={country['name']['common']}>
                        <p key={country['name']['common']}>{country['name']['common']} <button  onClick={()=>handleDetailPress(country['name']['common'])}>more info</button></p>
                    </div>
                )
            })
          }
        </>
      )
    }
  }

const DetailCountryView = ({extractCountry})=> {
    return (
        <>
        <h1>{extractCountry['name']['common']}</h1>
        <p>capital {extractCountry['capital'][0]}</p>
        <p>area {extractCountry['area']}</p>
        <h2>languages</h2>
        <ul>
            <LanguageList languageObj={extractCountry['languages']}/>
        </ul>
        <p style={{fontSize: 100}}>{extractCountry['flag']}</p>
    </>
    )
}

const LanguageList = ({languageObj})=> {
    let languages = []
    for (let langs in languageObj){
        languages.push(languageObj[langs])
    }
    return (
        languages.map(lang=> <li key={lang}>{lang}</li>)
    )
}


export default ViewCountries
