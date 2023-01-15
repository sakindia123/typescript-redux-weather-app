export const API_KEY = 'c0ad3447efda3f9b28c894e52fc4e0da'

const IconURL = (iconId: string) => `https://openweathermap.org/img/wn/${iconId}@2x.png`

const getWeatherData = async (city: string, units = 'metric') => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`
    const data = await fetch(URL)
        .then((res) => res.json())
        .then((data) => data)
    const { weather,
        main: { temp, feels_like, temp_min, temp_max, humidity, pressure },
        sys: { country },
        name } = data
    const { description, icon } = weather[0]
    return {
        description,
        IconURL: IconURL(icon),
        temp,
        feels_like,
        temp_min,
        temp_max,
        pressure,
        humidity,
        country,
        name
    }
}

export { getWeatherData }