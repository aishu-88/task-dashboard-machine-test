import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask,setNewTask]=useState({})

  // Load tasks initially
  useEffect(() => {
    
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then((res) => setTasks(res.data))
      .catch((err) => console.error('Failed to fetch tasks:', err));
     
  }, []);

  // Add new task
  const addTask = async (task) => {
    const res = await axios.post('https://jsonplaceholder.typicode.com/todos', task);
    setNewTask(res.data)
  };

  // Edit task
  const updateTask = async (id, updatedTask) => {
  
    
    const res = await axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`, updatedTask);
    
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? res.data : task))
    );
  };

  // Delete task
  const deleteTask = async (id) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <TaskContext.Provider value={{ tasks,setTasks,newTask,setNewTask, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};
