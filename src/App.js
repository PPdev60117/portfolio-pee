import logo from './logo.svg';
import './App.css';
import {BiSearchAlt} from 'react-icons/bi'
import { useEffect, useState } from 'react';
import axios from "axios";

function App() {

  const [city , setcity] = useState('Bangkok');
  const [status,setstatus] = useState('Clouds')
  const [wind,setwind] = useState('3.07')
  const [humidity,sethumidity] = useState('64')
  const [temp,settemp] = useState('30')
  const [contry,setcontry] = useState('Thailand')
  const [city1 , setcity1] = useState('Bangkok');
  const APIkey = 'f27d4610a00b0a0add1ef6efa3180f64';

  useEffect(()=>{
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}`)
    .then((response)=>{
      let t = Number(response.data.main.temp) - 273;

      setcity(response.data.name)
      setstatus(response.data.weather[0].main)
      setwind(response.data.wind.speed)
      sethumidity(response.data.main.humidity)
      settemp(t)
      setcontry(response.data.sys.country)
      console.log(response.data)
    })
    .catch((err)=>console.log(err))
  },[])

  function setData(e){
    e.preventDefault()
    setcity(city1)
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city1}&appid=${APIkey}`)
    .then((response)=>{
      
      let t = Number(response.data.main.temp) - 273;

      setcity(response.data.name)
      setstatus(response.data.weather[0].main)
      setwind(response.data.wind.speed)
      sethumidity(response.data.main.humidity)
      settemp(t)
      setcontry(response.data.sys.country)
      console.log(response.data)
    })
    .catch((err)=>{
      setcity(NaN)
      setstatus(NaN)
      setwind(NaN)
      sethumidity(NaN)
      settemp(NaN)
      setcontry(NaN)
    })
  }

  return (
    <div className="container">
      <div className='card'>
        <div className='search'>
          <form onSubmit={setData}>
            <input type='text'
            value={city1}
            onChange={(e)=>setcity1(e.target.value)}/>
            <button type='submit'><BiSearchAlt/></button>
          </form>

          <div>
            <h1>{Number(temp).toFixed(2)}</h1>
            <p>{city} | {contry}</p>
          </div>
        </div>

        <div className='info'>
          <ul>
            <li className ='status'><b>{status}</b></li>
            <li className ='humidity'><b>{humidity}</b></li>
            <li className ='wind'><b>{wind}</b>  knt.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
