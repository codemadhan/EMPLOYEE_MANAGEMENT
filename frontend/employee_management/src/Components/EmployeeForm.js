import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import axios from 'axios';
import './EmployeeForm.css';

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    employeeId: '',
    department: '',
    dob: '',
    gender: '',
    designation: '',
    salary: '',
    blood_group: '',
    experience: '',
    marital_status: '',
    email: '',
    phone_number: '',
    joining_date: ''
  });

  const [currentStep, setCurrentStep] = useState(1);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if dob and joining_date are greater than today's date
    // Get today's date
    const today = new Date();

    // Calculate the minimum date of birth for someone to be 18 years old
    const minDOB = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

    // Check if the date of birth is at least 18 years ago
    const dob = new Date(formData.dob);
    if (dob > minDOB) {
    alert('Person must be at least 18 years old');
    return;
  }

// Check if the joining date is not greater than today's date
    const joiningDate = new Date(formData.joining_date);
    if (joiningDate > today) {
    alert('Invalid Joining date ');
    return;
}

// Validation passed, continue with your logic

    try {
      await axios.post('http://localhost:8000/form/submit', formData);
      alert('Employee added successfully!');
    } catch (error) {
      alert('Failed to add employee. Please try again.');
    }
  };
  

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div className="form-container">
      <h1>ADD NEW EMPLOYEE</h1>
      <form onSubmit={handleSubmit} className="employee-form">
        {currentStep === 1 && (
          <>
            <div className="form-group">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Employee Name"
                maxLength={30}
                required
              />
            </div>
            <div className="form-group">
          <input
            type="text"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            placeholder="Employee ID"
            required
          />
        </div>
        <div className="form-group">
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          >
            <option value="">Select Department</option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
            <option value="Logistics">Logistics</option>
            <option value="Marketing">Marketing</option>
            <option value="Operations">Operations</option>
            <option value="Sales">Sales</option>
            <option value="Research and Development">Research and Development</option>
            <option value="Quality Assurance">Quality Assurance</option>
            <option value="Production">Production</option>
            <option value="Customer Support">Customer Support</option>
          </select>
        </div>
        <div className="form-group">
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
        
          <label><h4>GENDER:</h4></label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                onChange={handleChange}
                required
              />{' '}
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                onChange={handleChange}
                required
              />{' '}
              Female
            </label>
          </div>
        </div>
        <div className="form-group">
          <select
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            required
          >
            <option value="">Select Designation</option>
            <option value="Junior Engineer">Junior Engineer</option>
            <option value="Senior Engineer">Senior Engineer</option>
            <option value="Manager">Manager</option>
            <option value="Intern">Intern</option>
          </select>
        </div>
        <div className="form-group">
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            placeholder="Salary"
            maxLength={8}
            required
          />
        </div>

          </>
        )}

        {currentStep === 2 && (
          <>
          <div className="form-group">
          <select
            name="blood_group"
            value={formData.blood_group}
            onChange={handleChange}
            required
          >
            <option value="">Select Blood Group</option>
            <option value="A +ve">A +ve</option>
            <option value="A -ve">A -ve</option>
            <option value="B +ve">B +ve</option>
            <option value="B -ve">B -ve</option>
            <option value="O +ve">O +ve</option>
            <option value="O -ve">O -ve</option>
            <option value="AB +ve">AB +ve</option>
            <option value="AB -ve">AB -ve</option>
          </select>
        </div>
            <div className="form-group">
              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="Experience"
                required
              />
            </div>
            <div className="form-group">
              <label>Marital Status:</label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="marital_status"
                    value="Yes"
                    onChange={handleChange}
                    required
                  />{' '}
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="marital_status"
                    value="No"
                    onChange={handleChange}
                    required
                  />{' '}
                  No
                </label>
              </div>
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="tel"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                placeholder="Phone Number"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="date"
                name="joining_date"
                value={formData.joining_date}
                onChange={handleChange}
                placeholder="Joining Date"
                required
              />
            </div>
          </>
        )}

        {currentStep > 1 && (
          <button type="button" className="previous-button" onClick={prevStep}>
            Previous
          </button>
        )}

        {currentStep < 2 ? (
          <button type="button" className="next-button" onClick={nextStep}>
            Next
          </button>
        ) : (
          <button type="submit" className="submit-button">
            Submit
          </button>
        )}
      </form>
      <Link to="/home">
        <button>Go to Dashboard</button>
      </Link>
    </div>
  );
};

export default EmployeeForm;
