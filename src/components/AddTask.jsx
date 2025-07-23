import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTasks } from '../context/TaskContext';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  completed: yup.boolean(),
});

const AddTask = () => {
  const { addTask } = useTasks();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    await addTask(data);
    navigate('/dashboard');
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h3>Add New Task</h3>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-3">
          <label>Task Title</label>
          <input
            type="text"
            {...register('title')}
            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{errors.title?.message}</div>
        </div>

        <div className="form-check mb-3">
          <input
            type="checkbox"
            {...register('completed')}
            className="form-check-input"
            id="completed"
          />
          <label htmlFor="completed" className="form-check-label">
            Completed
          </label>
        </div>

        <button type="submit" className="btn btn-success" disabled={isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add Task'}
        </button>
      </form>
    </div>
  );
};

export default AddTask;
