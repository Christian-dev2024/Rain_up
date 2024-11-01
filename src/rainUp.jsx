import axios from 'axios'
import { useState , useEffect } from 'react'
import Navbar from './Navbar'
import Display from './rainUpDisplay'


export default function RainUp() {

    const [coordinates, setCoordinates] = useState(null) // État des coordonnées

    const [temperature, setTemperature] = useState(null) // État des données de temperature

    const [humidity, setHumidity] = useState(null) // État des données de l'humidité

    const [wind, setWind] = useState(null) // État des données du vent

    const [precipitation, setPrecipitation] = useState(null) // État des données des precipitations

    const [textMeteo, setTextMeteo] = useState ('') // État des textes meteo

    const [heurMeteo, setheurMeteo] = useState ('') // État des heures meteo

    const [dateMeteo, setDateMeteo] = useState ('') // État des heures meteo

    const [error, setError] = useState(null) // État pour gérer les erreurs

    const Key_Name = 'aucune_maguinchristian_souapohi' ;
    const Key_Mdp = 'U3e0cPHbl3' ;

    //recuperation des données de la ville pour le geocodage
    const cityCoordinates = (city) =>{
        axios.get('https://nominatim.openstreetmap.org/search', {
            params: {
                q: city,
                format: 'json'
            }
        })
            .then((response)=>{
                const data = response.data ;
                if( data && data.length > 0){
                    const {lat, lon} = data[0] ;
                    setCoordinates({lat, lon}) ;
                    setError(null) ;
                } else{
                    setCoordinates(null) ;
                    setTemperature(null) ;
                    setHumidity(null) ;
                    setWind(null) ;
                    setPrecipitation(null) ;
                    setError('ville non trouvé') ;
                }
            }) 
            .catch((error)=>{
                setError('Erreur lors de la recuperation des données', error) ;
            }) ;
    } ;

    useEffect(()=>{
        if(coordinates){
            const {lat, lon} = coordinates ;

        // configuration de l'authentification
        const auth_1 = { username : Key_Name, password : Key_Mdp}

        // recuperation de la temperature 
        axios.get(`https://api.meteomatics.com/now/t_2m:C/${lat},${lon}/json`,{auth: auth_1})
            .then((response)=>{
                console.log('temperature:', response.data)
                const temperatureData = response.data.data[0].coordinates[0].dates[0].value;
                setTemperature(temperatureData)
            })
            .catch(()=>{
                setError('erreur lors de la recuperation')
            })
        // recuperation de l'humidity
        axios.get(`https://api.meteomatics.com/now/relative_humidity_1000hPa:p/${lat},${lon}/json`,{auth: auth_1})
            .then((response)=>{
                console.log('humidity:', response.data)
                const humidityData = response.data.data[0].coordinates[0].dates[0].value;
                setHumidity(humidityData)
            })
            .catch(()=>{
                setError('erreur lors de la recuperation')
            })
        // recuperation de vent
        axios.get(`https://api.meteomatics.com/now/wind_speed_10m:ms/${lat},${lon}/json`,{auth: auth_1})
            .then((response)=>{
                console.log('vent:', response.data)
                const windData = response.data.data[0].coordinates[0].dates[0].value;
                setWind(windData)
            })
            .catch(()=>{
                setError('erreur lors de la recuperation')
            })
        // recuperation des precipitations
        axios.get(`https://api.meteomatics.com/now/precip_30min:mm/${lat},${lon}/json`,{auth: auth_1})
            .then((response)=>{
                if (response.data.data && response.data.data.length > 0){
                console.log('precipitation:', response.data)
                const prepData =  response.data.data[0].coordinates[0].dates[0].value;
                setPrecipitation(prepData )
                } else { 
                    console.error('Format des données inattendu ou absence de données'); 
                    setError('Erreur lors de la récupération des précipitations');
                }
            })
            .catch(()=>{
                setError('erreur lors de la recuperation')
            })
        // recuperarion de commentaire méteo
        axios.get(`https://api.meteomatics.com/now/weather_text_en:str/${lat},${lon}/csv`,{auth : auth_1})
            .then((response)=>{
                console.log('texte:', response.data) ;
                const textData =  response.data.split(";")[2] ;
                setTextMeteo(textData) ;
            })
            .catch(()=>{
                setError('erreur lors de la recuperation')
            })
        // recuperation de l'heure 
        axios.get(`https://api.meteomatics.com/now/weather_text_en:str/${lat},${lon}/csv`,{auth : auth_1})
            .then((response)=>{
                console.log('heure:', response.data) ;
                const dataTime = response.data.split(";")[1].split('T')[1] ;
                const time = dataTime.split('Z')[0];
                setheurMeteo(time) ;
                //recuperation de la date
                const dataDateStr = response.data.split(";")[1].split('T')[0] ;
                const dateOnly = dataDateStr.match(/\d{4}-\d{2}-\d{2}/)[0];
                setDateMeteo(dateOnly) ;
            })
            .catch((error) => { 
                console.error('Erreur lors de la récupération:', error); 
                setError('Erreur lors de la récupération'); 
            });
        }
    }, [coordinates])

    return (
        <div>
            <Navbar onSearch={cityCoordinates }/>
            <Display temperature= {temperature} humidity= {humidity} wind= {wind} precipitation= {precipitation} 
                error= {error} texte = {textMeteo} date = {dateMeteo} heure = {heurMeteo} />
        </div>
    )
}