import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CountryLong = ({country, showCountry, api_key}) => {

    const [weatherData, setWeatherData] = useState()
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        console.log(api_key);
        axios
        .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
        .then(response => {
            const weatherData = response.data
            console.log(weatherData)
            setWeatherData(weatherData)
            setLoading(false);

        })

    }, [0])


    if (isLoading) {
        return <div className="App">Loading...</div>;
    }
    return (
        <div>
            <h2>{country.name}</h2>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>
            <h3>Languages</h3>
            <ul>
                {country.languages.map((language, index) => (
                    <li>{language.name}</li>
                ))}
            </ul>
            <img src={country.flag} alt="flag" />
            <h3>Weather in {country.capital}</h3>
            {weatherData ?
                <div>
                    <p><b>temperature:</b> {weatherData.current.temperature} Celsius</p>
                    <img src={weatherData.current.weather_icons[0]} alt="weather icon" />
                    <p><b>wind:</b> {weatherData.current.wind_speed} mph direction {weatherData.current.wind_dir} </p>

                </div>
                :
                <div>
                    <p>Loading data..</p>
                </div>
            }
        </div>

      );


}

export default CountryLong;