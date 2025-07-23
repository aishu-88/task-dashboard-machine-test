import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import PrivateRoute from './components/privateRoute';
import Dashboard from './components/Dashboard';
import { AuthProvider } from './context/AuthContext';
import Register from './components/Register';
import AddTask from './components/AddTask';
import EditTask from './components/EditTask';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path='/register' element={<Register/>}/>
          
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path='/add-task' element={<AddTask/>}/>
            <Route path='/edit-task/:id' element={<EditTask/>}/>
          

          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
