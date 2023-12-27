import React, { useState, useEffect } from 'react';
import './list.css';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/header';
import Add from '../Add/Add';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showDeletePrompt, setShowDeletePrompt] = useState(false);
  const [deleteEmployeeId, setDeleteEmployeeId] = useState(null);
  const [editedEmployee, setEditedEmployee] = useState({
    firstName: '',
    lastName: '',
    email: '',
    salary: '',
    date: '',
  });
  const navigate=useNavigate();
  
  
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('/api/employees');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error('Error fetching employees:', error.message);
      }
    };

    fetchEmployees();
  }, []);

  const handleEdit = (employeeId) => {
    const employeeToEdit = employees.find((employee) => employee._id === employeeId);
    setSelectedEmployee(employeeToEdit);
    setEditedEmployee({
      firstName: employeeToEdit.firstName,
      lastName: employeeToEdit.lastName,
      email: employeeToEdit.email,
      salary: employeeToEdit.salary,
      date: new Date(employeeToEdit.date).toISOString().split('T')[0],
    });
  }
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  const handleEditEmployee = async () => {
    try {
      const response = await fetch(`/api/employees/${selectedEmployee._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedEmployee),
      });

      if (response.ok) {
        
        console.log('Employee updated successfully');
        navigate('/mainpage')
        window.location.reload();
       
      } else {
        const errorData = await response.json();
        console.error('Failed to update employee:', errorData.message);
      }
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };
  const handleDelete = (employeeId, firstName, lastName) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete ${firstName} ${lastName}?`);
 
    if (confirmDelete) {
      deleteEmployee(employeeId);
    setDeleteEmployeeId(employeeId);
    setShowDeletePrompt(true);
    
    }
  };

  const deleteEmployee = async (deleteEmployeeId) => {
    if (deleteEmployeeId === null) {
      return;
    }
    console.log('Delete employee function called');
    try {
      console.log('Sending DELETE request for employee ID:', deleteEmployeeId);
      const response = await fetch(`/api/employees/${deleteEmployeeId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
       
        console.log('Employee deleted successfully');
        const updatedEmployees = employees.filter((employee) => employee._id !== deleteEmployeeId);
        setEmployees(updatedEmployees);
      } else {
        const errorData = await response.json();
        console.error('Failed to delete employee:', errorData.message);
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
    } finally {
      setShowDeletePrompt(false);
      setDeleteEmployeeId(null);
    }
  };

 

  return (
    <div>
      <Header/>
      {selectedEmployee ? (
        <div  className="form-container">
          <form>
            <label>
              First Name:
              <input
                type="text"
                name="firstName"
                value={editedEmployee.firstName}
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
            value={editedEmployee.lastName}
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
            value={editedEmployee.email}
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
            value={editedEmployee.salary}
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
            value={editedEmployee.date}
            onChange={handleInputChange}
            required
          />
        </label>
            <button className='btn4' type="button" onClick={handleEditEmployee}>
              Save Changes
            </button>
            <button className='btn5' type="button" onClick={() => setSelectedEmployee(null)}>
              Cancel
            </button>
          </form>
          </div>
          ):(
            <div>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Salary</th>
            <th>Date</th>
            <th className="actions" colSpan="2">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>
              <td>₹{employee.salary}</td>
              <td>{new Date(employee.date).toLocaleDateString()}</td>
              <td>
                <button
                  className="btn1"
                  onClick={() => handleEdit(employee._id)}
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  className="btn2"
                  onClick={() => handleDelete(employee._id, employee.firstName, employee.lastName)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Add/>
        </div>
      )}

    </div>
  );
};

export default EmployeeList;