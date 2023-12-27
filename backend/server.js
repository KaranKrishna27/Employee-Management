const express = require('express');
const mongoose = require('mongoose');
const Employee = require('./models/Employee')
const app = express();
const PORT = process.env.PORT || 5000;
const employeeRouter = require('./routes/api/employees');

mongoose.connect('mongodb+srv://karankrishna27f:P3SxpeVbAJKnw5BU@cluster0.qci56uq.mongodb.net/', {});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

app.use(express.json());


app.use('/api/employees', employeeRouter);
app.post('/api/employees', async (req, res) => {
  try{
  const { firstName, lastName, email, salary, date } = req.body;

 
  const newEmployee = new Employee({
    firstName,
    lastName,
    email,
    salary,
    date,
  });
await newEmployee.save();

  res.status(201).json({ message: 'Employee added successfully' });
} catch (error) {
  console.error('Error saving user:', error);
  res.status(500).json({ message: 'Internal Server Error' });
}
});
app.get('/api/employees', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/api/employees/:id', async (req, res) => {
  try {
    const employeeId = req.params.id;
    
    const result = await Employee.findByIdAndDelete(employeeId);

    if (!result) {
      return res.status(404).json({ error: 'Employee not found' });
    }

   
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {}
   
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
