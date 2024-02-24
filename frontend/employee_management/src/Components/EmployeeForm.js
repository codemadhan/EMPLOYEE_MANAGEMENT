import React, { useState } from 'react';
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
    const today = new Date().toISOString().slice(0, 10);
    if (formData.dob > today || formData.joining_date > today) {
      alert('INVALID Date of Birth or Joining Date');
      return;
    }
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
            <option value="Finance">Logistics</option>
            <option value="Finance">Designing</option>
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
          <input
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            placeholder="Designation"
            required
          />
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
              <input
                type="text"
                name="blood_group"
                value={formData.blood_group}
                onChange={handleChange}
                placeholder="Blood Group"
                required
              />
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
    </div>
  );
};

export default EmployeeForm;
