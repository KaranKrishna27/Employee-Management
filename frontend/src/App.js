import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Landingpage from './components/LandingPage/landingpage';
import Mainpage from './components/MainPage/mainpage';
import Form from './components/Form/Form';
import EmployeeList from './components/List/list';

const App = () => {
  const [employees, setEmployees] = useState([]);

  const handleAddEmployee = (newEmployee) => {
    const emailExists = employees.some(
      (employee) => employee.email.toLowerCase() === newEmployee.email.toLowerCase()
    );

    if (emailExists) {
      alert('Email address already exists. Please use a different email.');
      return;
    }
    setEmployees([...employees, newEmployee]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/mainpage" element={<Mainpage/>}/>
        <Route path="/form" element={<Form employees={employees} onAddEmployee={handleAddEmployee} />} />
        <Route path="/edit-employee" element={<EmployeeList employees={employees} />} />
      </Routes>
    </Router>
  );
}

export default App;
