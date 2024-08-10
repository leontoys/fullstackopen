import { useState, useEffect } from 'react'
import axios from 'axios'
import Notification from "./components/Notification";
import Countries from "./components/Countries"
import Country from "./components/Country"
import Weather from "./components/Weather"

const App = () => {
  //state
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [allCountries, setAllCountries] = useState([])
  const [message, setMessage] = useState('')
  const [country, setCountry] = useState(null)
  const [weather, setWeather] = useState(null)

  const api_key = import.meta.env.VITE_SOME_KEY

  //get all countries - for the first time
  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        setAllCountries(response.data)
      })
  }
    , [])

  //when a country is selected, get its weather
  useEffect(() => {
    if (country) {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}`)
        .then(response => {
          //convert from kelvin to celsius
          const temperature = response.data.main.temp.toFixed(2) - 273
          //set weather
          const newWeather = { 
            capital: country.capital, 
            temperature: temperature, 
            wind: response.data.wind.speed, 
            icon: response.data.weather[0].icon }
          setWeather(newWeather)
        })
    }
  }
    , [country])

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
      (country) => country.name.common.toLowerCase().includes(filter.toLowerCase()))
    //if more than 10 countries matched 
    if (showCountries.length > 10) {
      setCountries([])
      setCountry(null)
      setWeather(null)
      setMessage('Too many matches, specify another filter')
    }
    //if it matches only one country, then show that
    else if (showCountries.length == 1) {
      setCountries([])
      setFilter('')
      setCountry(showCountries[0])
      setMessage('')
    }
    //otherwise show
    else {
      setCountries(showCountries)
      setCountry(null)
      setWeather(null)
      setMessage('')
    }
  }

  const showCountry = country => {
    setCountries([])
    setFilter('')
    setCountry(country)
    setMessage('')
  }

  return (
    <div>
      <form onSubmit={onSearch}>
        find countries: <input value={filter} onChange={handleChange} />
      </form>
      <Notification message={message}></Notification>
      {countries.map(country =>
        <Countries
          key={country.cca2}
          name={country.name.common}
          showCountry={() => showCountry(country)}
        />
      )}
      <Country country={country}></Country>
      <Weather weather={weather}></Weather>
    </div>
  )
}

export default App