const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  salary: Number,
  date: Date,

});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
