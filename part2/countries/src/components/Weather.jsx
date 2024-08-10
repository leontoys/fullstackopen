const Weather = ({ weather }) => {
  //on initial load it will be null object, so leave
  if(weather === null){
    return
  }
  const icon = `http://openweathermap.org/img/w/${weather.icon}.png`
  return (
    <div>
      <h2>Weather in {weather.capital}</h2>
      <p>temperature  {weather.temperature} Celsius</p>
      <img src={icon}></img>
      <p>wind {weather.wind} m/s</p>
    </div>
  )
}

export default Weather