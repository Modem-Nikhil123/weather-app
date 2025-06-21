import React, { use, useEffect, useState } from 'react'
import {CloudSun, Search} from 'lucide-react'
import axios from 'axios'
const API_KEY="5f1a96ad822e9ba34c67118230fbb12d";
export default function Home() {
  const [city,setCity]=useState("basar");
  const [weather,setWeather]=useState(
    {
      type:'',
      temp:'',
      humidity:'',
      wind_speed:'',
      icon:'.png'
    }
  )
  const handleSubmit=async(e)=>{
    try{
    const res=await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
    console.log(res.data);
    setWeather({
      type:res.data.weather[0].main,
      temp:res.data.main.temp,
      humidity:res.data.main.humidity,
      wind_speed:res.data.wind.speed,
      icon:`https://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`
    })

    }
    catch(err)
    {
      console.log(err);
    }
  }
  useEffect(()=>{
    handleSubmit();
  },[])
  return (
    <div className='h-screen flex items-center justify-center'>
      <form className='h-90 min-w-90 bg-blue-950 rounded p-3 text-white'
      onSubmit={(e)=>{
        e.preventDefault();
        handleSubmit();
      }}>
        <h1 className='text-2xl text-center'>Weather App</h1>
        <div className='flex items-center space-x-4'>
        <input type='text' value={city} onChange={(e)=>{
          setCity(e.target.value);
        }} placeholder='Search' className='bg-white text-gray-600 p-1 rounded'></input>
        <button className='border p-2 rounded-full m-3 bg-white cursor-pointer'><Search color='gray'/></button>
        </div>
        <div>
        <img src={weather.icon} alt="image"></img>
        <p>{weather.type}</p>
        <p className='text-5xl'>{weather.temp}°C</p>
        <p>Humidity:{weather.humidity}%</p>
        <p>Wind Speed:{weather.wind_speed}km/h</p>
        </div>
      </form>
     
    </div>
  )
}
