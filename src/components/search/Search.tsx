import bgImg from '../../assets/bg.jpg'
import Info from '../info/Info'
import { useState, useEffect } from 'react'
import { KeyboardEvent } from 'react'
import { AiFillHeart } from 'react-icons/ai'
import { getWeatherData } from '../../api/WeatherService'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

interface WeatherInfo {
    IconURL: string,
    country: string,
    description: string,
    feels_like: number,
    humidity: number,
    name: string,
    temp: number,
    temp_max: number,
    temp_min: number
}

// interface initialState {
//     data: []
// }

export default function Search() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [city, setCity] = useState("Bengaluru")
    const [weather, setWeather] = useState<WeatherInfo>()
    const [units, setUnits] = useState('metric')
    // const stateItems = useSelector((state: initialState) => state.data)

    const fetchData = async () => {
        const data = await getWeatherData(city, units)
        setWeather(data)
    }

    const handleUnitsClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const button = e.currentTarget
        const curUnit = button.innerText.slice(1)
        const isCelsius = curUnit === 'C'
        button.innerText = isCelsius ? '°F' : '°C'
        setUnits(isCelsius ? 'metric' : 'imperial')
    }

    const enterKeyPressed = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.keyCode === 13) {
            setCity(e.currentTarget.value)
            e.currentTarget.blur()
        }
    }

    useEffect(() => {
        fetchData()
    }, [units, city])

    return (
        <div className="app" style={{ backgroundImage: `url(${bgImg})` }}>
            <div className="overlay">
                {
                    weather && (
                        <div className="container">
                            <div className="section section__inputs">
                                <input type="text"
                                    name='city'
                                    placeholder='Enter City...'
                                    onKeyDown={enterKeyPressed} />
                                <div style={{ cursor: 'pointer' }} onClick={() => navigate('/favourites')}>
                                    My Favourites
                                </div>
                                <button onClick={(e) => handleUnitsClick(e)}>°F</button>
                            </div>
                            <div className="section section__temp">
                                <div className="icon">
                                    <h3>{`${weather.name}, ${weather.country}`}</h3>
                                    <img src={weather.IconURL} alt="weatherIcon" />
                                    <h3>{weather.description}</h3>
                                </div>
                                <div className="temp" >
                                    <h1>{`${weather.temp.toFixed()} °${units === "metric" ? "C" : "F"
                                        }`}</h1>
                                    <div onClick={() => { dispatch({ type: 'ADD_FAVOURITE', payload: { city, temp: Number(weather.temp.toFixed()) } }) }}
                                        style={{
                                            display: 'flex', alignItems: 'center',
                                            justifyContent: 'center', gap: '0.8rem', cursor: 'pointer'
                                        }}>
                                        Add to Favourites <AiFillHeart size={30} />
                                    </div>
                                </div>
                            </div>
                            <Info {...weather} units={units} />
                        </div>
                    )
                }
            </div>
        </div>
    )
}