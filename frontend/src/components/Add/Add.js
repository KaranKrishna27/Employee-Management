import React from 'react';
import { useNavigate } from 'react-router-dom';

const Add = () => {
    const navigate=useNavigate();
    const handleClick = () =>{
        navigate('/form')
    }
  return (
    <div>
      <button className='btn3' onClick={handleClick}>Add Employee</button>
    </div>
  )
}

export default Add
