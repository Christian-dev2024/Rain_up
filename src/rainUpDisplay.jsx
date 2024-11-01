import React from 'react'

export default function Display({temperature, humidity, wind, precipitation, error, texte, heure, date}) {
    return (
        <div className='carte-meteo'>
            <div className='containert-error'>
                    {error && <p>{error}</p>}
            </div>
            <div className='container-date'>
                {date && <p>{date}</p>}
            </div>
            <div className='container-heure'>
                {heure && <p>{heure}</p>}
            </div>
            <div className='container-temp'>
                    {temperature && <p> temperature: {temperature}C </p>}
            </div>
            <div className='container-hum'>
                    {humidity && <p> humidity: {humidity}% </p>}
            </div>
            <div className='container-wind'>
                    {wind && <p> speed wind: {wind}m/s </p>}
            </div>
            <div className='container-preci'>
                {precipitation  !== null ? <p> precipitation: {precipitation}mm </p> : <p></p>}
            </div>
            <div className='container-texte'>
                {texte && <p>{texte}</p>}
            </div>
        </div>
    )
}