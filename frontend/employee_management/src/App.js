import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import EmployeeForm from './Components/EmployeeForm';
import LoginPage from './Components/LoginPage';
import HomePage from './Components/HomePage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/add' element={<EmployeeForm/>}/>
          <Route path='/' element={<LoginPage/>}/>
          <Route path='/home' element={<HomePage/>}/>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;