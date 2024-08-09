import { useState, useEffect } from 'react'
import axios from 'axios'
import Notification from "./components/Notification";
import Countries from "./components/Countries"
import Country from "./components/Country"

const App = () => {
  //state
  const [filter,setFilter] = useState('')
  const [countries,setCountries] = useState([])
  const [allCountries,setAllCountries] = useState([])
  const [message,setMessage] = useState('')
  const [country,setCountry] = useState(null)

  //get all countries - for the first time
  useEffect(() => {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          setAllCountries(response.data)
        })
    }
  , [])

  //read the filter value for country
  const handleChange = (event) => {
    const newFilter = event.target.value
    setFilter(newFilter)
  }

  //this will be called when user searches
  const onSearch = (event) => {
    event.preventDefault()
    //Filter through list of countries and get the country that matches the filter
    const showCountries = allCountries.filter(
      (country)=> country.name.common.toLowerCase().includes(filter.toLowerCase()))
    //if more than 10 countries matched 
    if(showCountries.length > 10){
      setCountries([])
      setCountry(null)         
      setMessage('Too many matches, specify another filter')   
    }
    //if it matches only one country, then show that
    else if(showCountries.length == 1){
      setCountries([])
      setFilter('')
      setCountry(showCountries[0])
      setMessage('')
    }
    //otherwise show
    else{  
    setCountries(showCountries)
    setCountry(null)
    setMessage('')
    }
  }

  console.log(country)
  return (
    <div>
      <form onSubmit={onSearch}>
        find countries: <input value={filter} onChange={handleChange} />
      </form>
      <Notification message={message}></Notification>
      <ul>
          {countries.map(country => 
            <Countries
              key={country.cca2}
              name={country.name.common}
            />
          )}
      </ul>
      <Country country={country}></Country>      
    </div>
  )
}

export default App