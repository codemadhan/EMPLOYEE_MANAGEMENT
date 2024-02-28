import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './HomePage.css';

const HomePage = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [showTaskPopup, setShowTaskPopup] = useState(false);
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskCompletionStatus, setNewTaskCompletionStatus] = useState(false);
  const [newTaskProgress, setNewTaskProgress] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false); 

  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/form/getData');
        setEmployees(response.data); 
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchData();
  }, []);

  const handleAssignTask = async (employeeId) => {
    try {
      const response = await axios.get(`http://localhost:8000/form/getTaskbyID/${employeeId}`);
      setTasks(response.data);
      setSelectedEmployee(employeeId);
      setShowTaskPopup(true);
      setShowOverlay(true);
  
      // Reset new task variables when a new employee is selected
      setNewTaskDescription('');
      setNewTaskCompletionStatus(false);
      setNewTaskProgress(0);
    } catch (error) {
      console.error('Error fetching tasks for employee:', error);
    }
  };
  
  const handleCloseTaskPopup = () => {
    setShowTaskPopup(false);
    setShowOverlay(false); // Hide the overlay when the task popup is closed
  };

  const handleUpdateTask = async (taskId, newData) => {
    try {
      await axios.put(`http://localhost:8000/form/updateStatus/${taskId}`, newData);
      const response = await axios.get(`http://localhost:8000/form/getTaskbyID/${selectedEmployee}`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleAddTask = async () => {
    const newTask = {
      task: newTaskDescription,
      task_completion: newTaskCompletionStatus,
      progress: newTaskProgress
    };

    try {
      console.log(selectedEmployee);
      await axios.post(`http://localhost:8000/form/createTask/${selectedEmployee}`, newTask);
      const response = await axios.get(`http://localhost:8000/form/getTaskbyID/${selectedEmployee}`);
      setTasks(response.data);
      setNewTaskDescription('');
      setNewTaskCompletionStatus(false);
      setNewTaskProgress(0);
    } catch (error) {
      console.error('Error adding new task:', error);
    }
  };

  const handleAddEmployee = () => {
    navigate('/add'); // Navigate to the add employee page
  };

  const handleUpdateTaskProgress = (index, value) => {
    const updatedTasks = [...tasks]; // Create a copy of the tasks array
    updatedTasks[index].progress = value; // Update the progress of the task at the specified index
    setTasks(updatedTasks); // Update the tasks state variable
  };
  
  const getTaskColor = (progress) => {
    if (progress >= 100) {
      return '#4CAF50'; // Green for progress 100 or more
    } else if (progress >= 50) {
      return 'yellow'; // Yellow for progress between 50 and 99
    } else {
      return 'red'; // Red for progress between 0 and 49
    }
  };

  return (
    <div>
      <h1>EMPLOYEE INFORMATION</h1>
      <button onClick={handleAddEmployee}>Add Employee</button>
      {/* Button to navigate to the page for adding an employee */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th><h2>ID</h2></th>
              <th><h2>EMPLOYEE NAME</h2></th>
              <th><h2>DEPARTMENT</h2></th>
              <th><h2>DESIGNATION</h2></th>
              <th><h2>EXPERIENCE</h2></th>
              <th><h2>ACTIONS</h2></th>
            </tr>
          </thead>
          <tbody className='table-body'>
            {employees.map((employee) => (
              <tr key={employee.employee_id}>
                <td>{employee.employee_id}</td>
                <td>{employee.employee_name}</td>
                <td>{employee.department}</td>
                <td>{employee.designation}</td>
                <td>{employee.experience}</td>
                <td>
                  <button onClick={() => handleAssignTask(employee.employee_id)}>
                    Assign Task
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  
       {/* Task popup */}
       {showTaskPopup && (
        <div className="task-popup">
          <h1 className='headin'>TASKS FOR EMPLOYEE ID: {selectedEmployee}</h1>
          <button onClick={handleCloseTaskPopup}>Close</button>
          <div className="task-content">
            {/* Task content */}
          </div>
        </div>
      )}

      {/* Overlay */}
      {showOverlay && <div className="overlay" onClick={handleCloseTaskPopup}></div>}


      {showTaskPopup && (
        <div className="task-popup">
          <h1>TASKS FOR EMPLOYEE ID: {selectedEmployee}</h1>
          <button onClick={() => setShowTaskPopup(false)}>Close</button>
          <div className="task-content">
            {tasks.map((task, index) => (
              <div key={task.task_id} className="task-card">
                <h2 style={{ color: getTaskColor(task.progress) }}>{task.task}</h2>
                <p>Completion Status: {task.progress >= 100 ? 'Yes' : 'No'}</p>
                <input
                  type="number"
                  value={task.progress}
                  onChange={(e) => handleUpdateTaskProgress(index, e.target.value)}
                />
                <progress value={task.progress} max="100"></progress>
                <button onClick={() => handleUpdateTask(task.task_id, task)}>Update</button>
              </div>
            ))}
          </div>
          <div>
            <h3>Add Task</h3>
            <input
              type="text"
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
              placeholder="Task Description"
            />
            <label>
              <input
                type="checkbox"
                checked={newTaskCompletionStatus}
                onChange={(e) => setNewTaskCompletionStatus(e.target.checked)}
              />
              Completion Status
            </label>
            <input
              type="number"
              value={newTaskProgress}
              onChange={(e) => setNewTaskProgress(e.target.value)}
              placeholder="Progress"
            />
            <button onClick={handleAddTask}>Add Task</button>
          </div>
        </div>
      )}
    </div>
  );
  };

export default HomePage;
