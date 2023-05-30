import axios from "axios"


const key = process.env.REACT_APP_WEATHER_KEY

// http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={API key}

const getWeather = (lat,lon) => {
    console.log('weather data here')
    const baseUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`
    const request = axios.get(baseUrl)
    return request.then(weatherData=>weatherData)
}


export default {getWeather}

