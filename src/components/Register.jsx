import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './Login.css'

const schema = yup.object().shape({
    name:yup.string().required('Name is eequired'),
    email:yup.string().email().required('Email is required'),
    password:yup.string().min(6).required('password is required'),
});
const Register =() => {
    const { login } = useAuth();
    const navigate = useNavigate();

 const { register,handleSubmit, formState: { errors,isSubmitting },
}= useForm({
    resolver: yupResolver(schema),
});

const onSubmit = async (data) => {
console.log(data.email, data.password);
    try {
        const res = await axios.post('https://reqres.in/api/register', {
            email: data.email,
            password: data.password,
        },
    {
     headers: { 'x-api-key': 'reqres-free-v1', } ,  
    }
);
        console.log(res.data)
        login(res.data.token);
        navigate('/login');
    }catch(err) {
        alert('Registration is failed,please check your email or password.');
        console.log(err)
    }
};

  return (
    <div className="form-center-wrapper" >
      <div className="form-container" >
      <h3>Register</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4" noValidate>
        <div className='mb-3'>
            <label>Name</label>
            <input type='text' {...register('name')} className={`form-control ${errors.name ? 'is-invalid' : ''}`}/>
            <div className="invalid-feedback">{errors.name?.message}</div>
            
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`}/>
          <div className="invalid-feedback">{errors.email?.message}</div>
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`}/>
          <div className="invalid-feedback">{errors.password?.message}</div>
        </div>

        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Registering...' : 'Register'}
        </button>
                  <p>Already Registerd user? <a href='/login'>login here</a></p>

      </form>
    </div>
    </div>
  );
};

export default Register;
