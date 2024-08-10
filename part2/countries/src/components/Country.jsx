const Country = ({ country }) => {
  //on initial load it will be null object, so leave
  if(country === null){
    return
  }
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital  {country.capital[0]}</p>
      <p>area   {country.area}</p>
      <h2>languages</h2>
      <ul>
      {Object.entries(country.languages).map(language =>
          <li key={language[0]}>{language[1]} </li>
            )}        
      </ul>
      <div>
      <img src={country.flags.png}></img>
      </div>
    </div>
  )
}

export default Country