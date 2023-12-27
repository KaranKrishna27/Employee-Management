import React from 'react';

import EmployeeList from '../List/list';
import { useNavigate } from 'react-router-dom'


const Mainpage = () => {
    const navigate=useNavigate();
    const handleEditEmployee = (employeeId) => {
      console.log(`Editing employee with ID: ${employeeId}`);}

  return (
    <div>
      
      <EmployeeList handleEditEmployee={(employeeId) => handleEditEmployee(employeeId, navigate)} />
   
    </div>
  );
};

export default Mainpage;
