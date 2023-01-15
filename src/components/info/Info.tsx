import './Info.css'
import { BiHappy } from "react-icons/bi";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { MdOutlineWaterDrop } from "react-icons/md";

type Props = {
    units: string,
    country: string,
    description: string,
    feels_like: number,
    humidity: number,
    name: string,
    temp: number,
    temp_max: number,
    temp_min: number
}

export default function Info({ units, feels_like, temp_min, temp_max, humidity }: Props) {
    const tempUnit = units === "metric" ? "°C" : "°F";

    const cards = [
        {
            id: 1,
            icon: <FaArrowDown />,
            title: "min",
            data: temp_min.toFixed(),
            unit: tempUnit
        },
        {
            id: 2,
            icon: <FaArrowUp />,
            title: "max",
            data: temp_max.toFixed(),
            unit: tempUnit
        },
        {
            id: 3,
            icon: <BiHappy />,
            title: "feels like",
            data: feels_like.toFixed(),
            unit: tempUnit
        },
        {
            id: 4,
            icon: <MdOutlineWaterDrop />,
            title: "humidity",
            data: humidity,
            unit: "%"
        }
    ]

    return <div className="section section__info">
        {cards.map((card) => {
            return <div key={card.id} className="card">
                <div className="info__card-icon">
                    {card.icon}
                    <small>{card.title}</small>
                </div>
                <h2>{`${card.data} ${card.unit}`}</h2>
            </div>
        })}
    </div>
}