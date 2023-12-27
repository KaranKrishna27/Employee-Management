import React, { useState } from 'react';
import './Form.css';
import { useNavigate } from 'react-router-dom';

const Form = ({ employees=[], onAddEmployee }) => {
  const [newEmployee, setNewEmployee] = useState({
    firstName: '',
    lastName: '',
    email: '',
    salary: '',
    date: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  const handleBack = ()=>{
    navigate('/mainpage')
  }

  const handleAddEmployee = async () => {
    if (
      !newEmployee.firstName ||
      !newEmployee.lastName ||
      !newEmployee.email ||
      !newEmployee.salary ||
      !newEmployee.date
    ) {
      alert('All fields are required!');
      return;
    }
    const emailExists = employees.some(
      (employee) => employee.email.toLowerCase() === newEmployee.email.toLowerCase()
    );

    if (emailExists) {
      alert('Email address already exists. Please use a different email.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEmployee),
      });

      if (response.ok) {
        const data = await response.json();
        navigate('/mainpage');
        console.log('New employee added:', data);

        setNewEmployee({
          firstName: '',
          lastName: '',
          email: '',
          salary: '',
          date: '',
        });
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to add employee');
      }
    } catch (error) {
      console.error('Error adding employee:', error);
      setError('An error occurred while adding the employee');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="form-container">
      <form>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={newEmployee.firstName}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={newEmployee.lastName}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={newEmployee.email}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Salary:
          <input
            type="text"
            name="salary"
            value={newEmployee.salary}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={newEmployee.date}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <button className='btn4' type="button" onClick={handleAddEmployee} disabled={loading}>
        {loading ? 'Adding Employee...' : 'Add Employee'}
        </button>
        <button className='btn5' onClick={handleBack}>Go Back</button>
      </form>
    </div>
  );
};

export default Form;
