import './App.css';
import React, { useState } from 'react';
//import { Host, Key } from '../api';

const Airport = ({ data }) => {
  return (
    <div>
      {data.hasOwnProperty('error') ? <div className='airport'> <h1>"No airport found"</h1></div> :
        <div className='airport'>
          {data.name === '' ? <></> : <h1 className='airportname'> {data.name} ({data.iata})</h1>}
          {data.state === '' ? <></> : <h2 className='state'> {data.state}</h2>}
          <div className='pragraph'>
            {data.id === '' ? <></> : <p><strong>ID:</strong> {data.id}</p>}
            {data.location === '' ? <></> : <p><strong>Location:</strong> {data.location}</p>}
            {data.street === '' ? <></> : <p><strong>Street:</strong> {data.street}</p>}
            {data.city === '' ? <></> : <p className='cityname'><strong>City:</strong>{data.city}</p>}
            {data.county === '' ? <></> : <p><strong>County:</strong> {data.county}</p>}
            {data.state === '' ? <></> : <p><strong>State:</strong> {data.state}</p>}
            {data.country_iso === '' ? <></> : <p><strong>Country_iso:</strong> {data.country_iso}</p>}
            {data.country === '' ? <></> : <p><strong>Country:</strong> {data.country}</p>}
            {data.postal_code === '' ? <></> : <p><strong>Costal_code:</strong> {data.postal_code}</p>}
            {data.phone === '' ? <></> : <p><strong>Phone:</strong> {data.phone}</p>}
            <a href={data.website} target="_blank"> Website </a>
          </div>
        </div>
      }
    </div>
  )
}

const Headers = ({ handleChange, city, getAirport }) => {
  return (
    <div className='header'>
      <h1>Airport.info</h1>

      <input className='input'
        type='text'
        id='city'
        name='city'
        placeholder='City'
        value={city}
        onChange={handleChange}
      //onKeyPress={getAirport}
      />
      <button className='btn' onClick={getAirport} type='search' >Search</button>

    </div>
  )
}

const Welcomepage = () => {
  return (
    <div>
      <h3>Find your airport info....</h3>
      <a href='https://www.world-airport-codes.com/' target="_blank">  FOLLOW THE LINK TO FIND AIRPORT CODE </a>

    </div>
  )
}


function App() {
  const [data, setData] = useState('')
  const [city, setCity] = useState('')


  const handleChange = (e) => {
    const value = e.target.value
    setCity(value)
  }

  const getAirport = () => {

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
        'X-RapidAPI-Host': process.env.REACT_APP_API_HOST
      }
    };

    fetch(`https://airport-info.p.rapidapi.com/airport?iata=${city}`, options)
      .then(response => response.json())
      .then(response => {
        setData(response)
        setCity('')
      })
      .catch(err => console.error(err));


  }

  return (
    <div className="App">
      <Headers city={city} handleChange={handleChange} getAirport={getAirport} />
      {data === '' ? <Welcomepage /> : <Airport data={data} />}
    </div>
  );
}

export default App;
