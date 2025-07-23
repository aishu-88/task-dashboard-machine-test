import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';
import axios from 'axios';

const EditTask = () => {
  const { id } = useParams();
  const { updateTask } = useTasks();
  const [task, setTask] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("HIIIIII");
    
    axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then((res) => setTask(res.data))
      .catch((err) => alert('Task not found'));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setTask({ ...task, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateTask(task.id, task);
    navigate('/dashboard');
  };

  if (!task) return <div className="container mt-5">Loading task...</div>;

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h3>Edit Task</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Task Title</label>
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="form-check mb-3">
          <input
            type="checkbox"
            name="completed"
            checked={task.completed}
            onChange={handleChange}
            className="form-check-input"
            id="completed"
          />
          <label htmlFor="completed" className="form-check-label">
            Completed
          </label>
        </div>

        <button type="submit" className="btn btn-primary">Update Task</button>
      </form>
    </div>
  );
};

export default EditTask;
