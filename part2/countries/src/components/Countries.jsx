const Countries = ({ name,showCountry }) => {
  return (
    <div>
      {name}
      <button onClick={showCountry}>show</button>      
    </div>
  )
}

export default Countries