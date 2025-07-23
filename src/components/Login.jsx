import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Login.css'

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required()
})

const Login = () => {
  const { register, handleSubmit } = useForm({ resolver: yupResolver(schema) })
  const navigate = useNavigate()
  const { login } = useAuth()

  const onSubmit = async (data) => {
    try {
      console.log(data);
      console.log('Payload being sent:', data);

      
      const res = await axios.post('https://reqres.in/api/login', {...data},
        {
     headers: { 'x-api-key': 'reqres-free-v1', } ,  
    }
      );
      console.log(res.data)
      login(res.data.token)
      navigate('/dashboard')
    } catch (err) {
      alert('Login failed')
    }
  }


  return (
    <div className="form-center-wrapper">
      <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input className="form-control mb-2" {...register('email')} placeholder="Email" />
        <input className="form-control mb-2" type="password" {...register('password')} placeholder="Password" />
        <button className="btn btn-primary">Login</button>
         <p>New user..<a href="/register">register here?</a></p>
      </form>
    </div>
    </div>
  )
}

export default Login
