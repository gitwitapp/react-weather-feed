import React, { useEffect, useState } from 'react'
import { WiCloudy, WiDaySunny, WiRain, WiSnow } from 'react-icons/wi'

import './tailwind-config.js'

export default function App() {
  const [weatherData, setWeatherData] = useState(null)
  
  useEffect(() => {
    fetchWeather()
  }, [])
  
  const fetchWeather = async () => {
    try {
      const response = await fetch('https://api.weather.gov/gridpoints/TOP/31,80/forecast')
      const data = await response.json()
      setWeatherData(data)
    } catch (error) {
      console.log(error)
    }
  }
  
  const getWeatherIcon = (detailedForecast) => {
    if (detailedForecast.includes("cloudy") || detailedForecast.includes("overcast")) {
      return <WiCloudy size={40} />
    } else if (detailedForecast.includes("sunny")) {
      return <WiDaySunny size={40} />
    } else if (detailedForecast.includes("rain")) {
      return <WiRain size={40} />
    } else if (detailedForecast.includes("snow")) {
      return <WiSnow size={40} />
    } else {
      return null
    }
  }
  
  return (
    <div className="p-2">
      <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl">
        Weather Forecast
      </h1>
      
      {weatherData && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {weatherData.properties.periods.map((period) => (
            <div key={period.number} className="bg-white p-4 shadow rounded-lg">
              <h2 className="text-lg font-bold mb-2">{period.name}</h2>
              {getWeatherIcon(period.detailedForecast)}
              <p className="font-medium mt-2">Temperature: {period.temperature}°F</p>
              <p className="text-gray-500 mt-2">Forecast: {period.detailedForecast}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}