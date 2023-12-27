import React from 'react'
import Header from '../Header/header'
import './landingpage.css'
import { useNavigate } from 'react-router-dom'

const Landingpage = () => {
const navigate=useNavigate();

const handleClick = () =>{
    navigate('/mainpage')
}
  return (
    <div className='landingpage'>
    <h1>WELCOME TO</h1>
      <Header/>
      <br/>
      <button className='btn3' onClick={handleClick}>Get Started</button>
   
      
      </div>
    
  )
}

export default Landingpage
