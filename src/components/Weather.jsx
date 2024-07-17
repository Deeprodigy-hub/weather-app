import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search_icon.png'
import cloud from '../assets/cloud.png'
import drizzle from '../assets/drizzle.png'
import humidity from '../assets/humidity.png'
import rain from '../assets/rain.png'
import wind from '../assets/wind.png'
import snow from '../assets/snow.png'
import sun from '../assets/sun.png'

const Weather = () => {

    const inputRef = useRef()
    const [weatherData, setWeatherData] =  useState(false);

    const allIcons = {
        "01d" : sun,
        "01n" : sun,
        "02d" : cloud,
        "02n" : cloud,
        "03d" : drizzle,
        "03n" : drizzle,
        "04d" : humidity,
        "04n" : humidity,
        "05d" : rain,
        "05n" : rain,
        "06d" : wind,
        "06n" : wind,
        "07d" : snow,
        "07n" : snow,
        "08d" : sun,
        "08n" : sun,
    }

    const search = async (city)=> {
        if (city ==='') {
            alert("Enter City Name");
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            
            const response = await fetch(url);

            const data = await response.json(); 
            console.log(data);

            if (!response.ok) {
                alert(data.message);
                return;
            }

            const icons = allIcons[data.weather[0].icon] || sun;
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icons,
            })
        } catch (error) {
            setWeatherData(false);
            console.error("Error in fetching weather data");
        }
    }

    useEffect(()=> {
        search("London");
    }, [])

  return (
    <div className='weather'>
        <div className="search-bar">
            <input ref={inputRef} type="text" placeholder='Search' />
            <img className='image' src={search_icon} alt="" onClick={()=>search(inputRef.current.value)}/>
        </div>

        {weatherData?<>
            <img src={weatherData.icon} alt="sun" className='weather-icon'/>
            <p className='temperature'>{weatherData.temperature}°c</p>
            <p className='location' >{weatherData.location}</p>
            <div className="weather-data">
                <div className="col">
                    <img src={humidity} alt="" />
                    <div>
                        <p>{weatherData.humidity} %</p>
                        <span>Humidity</span>
                    </div>
                </div>
                <div className="col">
                    <img src={wind} alt="" />
                    <div>
                        <p>{weatherData.windSpeed}km/h</p>
                        <span>Wind Speed</span>
                    </div>
                </div>
            </div>
        
        </>:<></>}
        
    </div>
  )
}

export default Weather