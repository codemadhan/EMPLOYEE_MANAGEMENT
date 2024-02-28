import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(formData.password === 'hehehaha'){
        navigate('/home');
      }
      else{
        alert('Wrong password, Try again');
        return;
      }
      
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="login-container">
      <h1>ADMIN LOGIN</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>PASSWORD:</label>
          <input 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            required 
          />
        </div>
        <button type="submit" className="submit-button">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;

