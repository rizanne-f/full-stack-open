import axios from "axios"
import { useEffect, useState } from "react"

const Country = ({ filteredResult }) => {
  const latlng  = filteredResult[0].capitalInfo.latlng
  const [weather, setWeather] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&appid=${import.meta.env.VITE_SOME_KEY}&units=metric`)
      .then(response => {
        setWeather(response.data)
        setIsLoading(false)
      })
      .catch(error => console.error("Failed to fetch: ", error))
  }, [])

  return (
    <div>
      <h1>{filteredResult[0].name.common}</h1>
      <div>Capital: {filteredResult[0].capital}</div>
      <div>Area: {filteredResult[0].area}</div>

      <h2>Languages</h2>
      <ul>
        {Object.values(filteredResult[0].languages).map(
          lang => <li key={lang}>{lang}</li>
        )}
      </ul>

      <img
        style={{boxShadow: "0 0 5px #444"}}
        src={filteredResult[0].flags.png}
        alt={`Flag of ${filteredResult[0].name.common}`} />
      
      <h2>Weather in {filteredResult[0].capital}</h2>
      <div>Temperature: {isLoading ? "Loading..." : `${weather.main.temp}° Celsius`}</div>
      <img src={`https://openweathermap.org/payload/api/media/file/${isLoading ? null : weather.weather[0].icon}.png`} />
      <div>Wind: {isLoading ? "Loading..." : `${weather.wind.speed} m/s`}</div>
    </div>
  )
}

export default Country