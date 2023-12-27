const express = require('express');
const router = express.Router();
const Employee = require('../../models/Employee');


router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  const employeeId = req.params.id;

  try {
    
    const existingEmployee = await Employee.findById(employeeId);

    if (!existingEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

   
    existingEmployee.firstName = req.body.firstName || existingEmployee.firstName;
    existingEmployee.lastName = req.body.lastName || existingEmployee.lastName;
    existingEmployee.email = req.body.email || existingEmployee.email;
    existingEmployee.salary = req.body.salary || existingEmployee.salary;
    existingEmployee.date = req.body.date || existingEmployee.date;

    const updatedEmployee = await existingEmployee.save();

    res.json(updatedEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
