import React from 'react'
import './Login.css'
import { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// import { useNavigate } from 'react-router-dom'

const Login = () => {
  sessionStorage.clear()
  // let navigate = useNavigate()
  const [hrPhone, setHRPhone] = useState('')
  const [password, setPassword] = useState('')
  const checkLogin = (e) => {
    e.preventDefault()
    var loginData = {
      hrPhone: hrPhone,
      password: password,
    }
    axios.post(`http://127.0.0.1:8000/login`, loginData).then((res) => {
      // eslint-disable-next-line
      if (res.data.Status == 'True') {
        window.sessionStorage.setItem('hrPhone', hrPhone)
        window.sessionStorage.setItem('isLoggedIn', true)
        // let path = `home`
        // navigate(path)
        window.location.href = '/home'
      } else {
        toast('Check Login and Password')
        // alert('Check Login and Password')
      }
    })
  }

  return (
    <div className='container'>
      <ToastContainer
        position='top-center'
        toastStyle={{ backgroundColor: '#E74C3C', color: 'white' }}
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <h1 className='title'>HR Portal</h1>
      <div className='loginContainer'>
        <input
          name='hrPhone'
          id='hrPhone'
          placeholder='Phone'
          className='inputField'
          autoComplete='off'
          type={'number'}
          value={hrPhone}
          onChange={(e) => {
            setHRPhone(e.target.value)
          }}
        ></input>
        <input
          name='password'
          id='password'
          placeholder='password'
          className='inputField'
          autoComplete='off'
          type={'password'}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        ></input>
        {/* <div className='buttonsContainer'> */}
        <button className='btn' type='button' onClick={checkLogin}>
          Login
        </button>
        <p className='registerText'>
          Don't have an account?{' '}
          <a href='/register' style={{ color: '#70B4F8' }}>
            Register
          </a>
        </p>
      </div>
    </div>
  )
}

export default Login
