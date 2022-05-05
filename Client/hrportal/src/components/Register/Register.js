import React from 'react'
import { useState } from 'react'
import axios from 'axios'
// import { useNavigate } from 'react-router-dom'

const Register = () => {
  sessionStorage.clear()
  // let navigate = useNavigate()
  const [hrName, setHRName] = useState('')
  const [hrEmail, setHREmail] = useState('')
  const [hrPhone, setHRPhone] = useState('')
  const [password, setPassword] = useState('')
  const [imageString, setImageString] = useState('')

  const convertImage = async (e) => {
    const imageFile = e.target.files[0]
    const base64 = await convertToBase64(imageFile)
    setImageString(base64)
  }

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)

      fileReader.onload = () => {
        resolve(fileReader.result)
      }

      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }

  const Register = (e) => {
    e.preventDefault()
    var RegisterData = {
      hrPhone: hrPhone,
      password: password,
      hrName: hrName,
      hrEmail: hrEmail,
      imageString: imageString,
    }
    console.log(RegisterData)
    axios.post(`http://127.0.0.1:8000/signUp`, RegisterData).then((res) => {
      // eslint-disable-next-line
      if (res.data.Response == 'User Created Succesfully') {
        window.sessionStorage.setItem('isLoggedIn', true)
        window.sessionStorage.setItem('hrPhone', hrPhone)
        // let path = `/home`
        // navigate(path)
        window.location.href = '/home'
      } else {
        alert('Please check details')
      }
    })
  }

  return (
    <div className='container'>
      <h1 className='title'>HR Portal</h1>
      <div className='loginContainer' style={{ padding: '30px 0 0' }}>
        <input
          name='hrName'
          id='hrName'
          placeholder='Name'
          className='inputField'
          type={'text'}
          autoComplete='off'
          value={hrName}
          onChange={(e) => {
            setHRName(e.target.value)
          }}
        ></input>
        <input
          name='hrEmail'
          id='hrEmail'
          placeholder='Email'
          className='inputField'
          type={'email'}
          autoComplete='off'
          value={hrEmail}
          onChange={(e) => {
            setHREmail(e.target.value)
          }}
        ></input>
        <input
          name='hrPhone'
          id='hrPhone'
          placeholder='Phone'
          className='inputField'
          type={'number'}
          autoComplete='off'
          value={hrPhone}
          onChange={(e) => {
            setHRPhone(e.target.value)
          }}
        ></input>
        <input
          name='password'
          id='password'
          placeholder='password'
          // className='inputField'
          autoComplete='off'
          type={'password'}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        ></input>
        <input
          // className='btn'
          type='file'
          id='profileImage'
          onChange={(e) => {
            convertImage(e)
          }}
          name='avatar'
          accept='image/png, image/jpeg'
        ></input>

        <button className='btn' type='button' onClick={Register}>
          Register
        </button>
        <p className='registerText'>
          Have an account?{' '}
          <a href='/' style={{ color: '#70B4F8' }}>
            Login
          </a>
        </p>
      </div>
    </div>
  )
}

export default Register
