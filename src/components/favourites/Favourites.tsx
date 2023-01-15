import './Favourites.css'
import bgImg from '../../assets/bg.jpg'
import { AiFillHeart, AiFillHome } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface initialState {
    data: []
}

export default function Favourites() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const stateItems = useSelector((state: initialState) => state.data)

    useEffect(() => {
    }, [dispatch])

    return (
        <div className="app" style={{ backgroundImage: `url(${bgImg})` }}>
            <div className="overlay">
                <div className="fav-container">
                    <div className="section section__home" onClick={() => navigate('/')}>
                        Return to Home Page <AiFillHome />
                    </div>
                    {stateItems.map((card, index) => {
                        return <div className="section section__temp" key={index} style={{ height: 100 }}>
                            <div className="icon">
                                <h3>{card['city']}</h3>
                                <h3>{card['temp']}° C</h3>
                            </div>
                            <div className="temp" >
                                <div onClick={() => { dispatch({ type: 'REMOVE_FAVOURITE', payload: card['city'] }) }}
                                    style={{
                                        display: 'flex', alignItems: 'center',
                                        justifyContent: 'center', gap: '0.8rem', cursor: 'pointer'
                                    }}>
                                    Remove from Favourites <AiFillHeart size={30} />
                                </div>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}