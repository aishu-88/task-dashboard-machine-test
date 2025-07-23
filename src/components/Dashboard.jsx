import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';
import Table from 'react-bootstrap/Table'


const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const {tasks,setTasks,newTask} = useTasks()
  const [filter, setFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('asc');
    const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');

useEffect(() => {
    document.body.className = darkMode ? 'bg-dark text-white' : 'bg-light text-dark';
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  // 🔄 Fetch tasks from JSONPlaceholder
  const fetchTasks = async () => {
    try {
     
      const res = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=20');
      setTasks(res.data);
      
    } catch (err) {
      console.error('Error fetching tasks', err);
    }
  };

  useEffect(() => {
   
    fetchTasks();
    
  }, []);

  // 🧹 Filtered tasks
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  // 🔃 Sorted tasks
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    return sortOrder === 'asc' ? a.id - b.id : b.id - a.id;
  });
 sortedTasks.unshift(newTask)
  // ✅ Mark task as completed
  const markComplete = (id) => {
    const updated = tasks.map(task =>
      task.id === id ? { ...task, completed: true } : task
    );
    setTasks(updated);
  };

  // ❌ Delete task
  const deleteTask = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this task?');
    if (confirmDelete) {
      const updated = tasks.filter(task => task.id !== id);
      setTasks(updated);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h3>Task Dashboard</h3>
  
          <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="darkModeSwitch"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          <label className="form-check-label" htmlFor="darkModeSwitch">
            {darkMode ? 'Dark Mode' : 'Light Mode'}
          </label>
        </div>

        <button onClick={() => { logout(); navigate('/login'); }} className="btn btn-danger">
          Logout
        </button>
      </div>
      

      <div className="mb-3 d-flex gap-2">
        <select className="form-select w-auto" onChange={(e) => setFilter(e.target.value)} value={filter}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>

        <select className="form-select w-auto" onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
          <option value="asc">Sort: Ascending</option>
          <option value="desc">Sort: Descending</option>
        </select>
      </div>
      <button onClick={() => navigate('/add-task')} className="btn btn-success mb-3">ADD TASK</button>

      <Table className="table table-bordered table-hover">
      <thead className="table-dark">
      <tr>
      <th>ID</th>
      <th>Title</th>
      <th>Status</th>
      <th className="text-center">Actions</th>
      </tr>
        </thead>
        <tbody>
          {sortedTasks.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.title}</td>
              <td>
                {task.completed ? (
                  <span className="badge bg-success">Completed</span>
                ) : (
                  <span className="badge bg-warning text-dark">Pending</span>
                )}
              </td>
              <td className="text-center">
               <button
            className={`btn btn-sm me-2 ${task.completed ? 'btn-success active' : 'btn-outline-success'}`}
            data-bs-toggle="button"
            aria-pressed={task.completed}
            onClick={() => !task.completed && markComplete(task.id)}
           disabled={task.completed}>
            {task.completed ? 'Completed' : 'Mark Complete'}</button>

                <button
                  onClick={() => navigate(`/edit-task/${task.id}`)}
                  className="btn btn-primary btn-sm me-2"
                >
                  Edit
                </button>
                <button onClick={() => deleteTask(task.id)} className="btn btn-danger btn-sm">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {sortedTasks.length === 0 && (
        <p className="text-center mt-4">No tasks found for selected filter.</p>
      )}
    </div>
  );
};

export default Dashboard;
