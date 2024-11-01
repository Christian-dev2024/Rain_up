import React, { useState } from 'react'
import './App.css';
import './navbar.css' ;
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import { Button, TextField } from '@mui/material';


export default function Navbar({onSearch}) {

    const [city, setCity] = useState('') // État pour la ville saiasie
    
    const handleSearch = (e) => {
        e.preventDefault() ;
        if(city.trim() !== ''){
            onSearch(city);
            setCity('') ;
        }
    }

    return (
        <nav className='nav-bar'>
            <div className='container'> 
                    <p>Globe Meteo</p>
                <ThunderstormIcon style={{fontSize: '40px'}}/>
                
            </div>
            <form className='container-search' onSubmit={handleSearch}>
                <TextField placeholder='Search city' variant='outlined' value={city} className='barre' onChange={(e)=> setCity(e.target.value)}/>
                <Button style={{backgroundColor:'#6A49FA'}} type='submit' variant='contained'>Search</Button>
            </form>
        </nav>
    )
}