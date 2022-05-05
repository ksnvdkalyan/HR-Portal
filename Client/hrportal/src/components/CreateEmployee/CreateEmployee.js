import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// import { useNavigate } from 'react-router-dom'

const CreateEmployee = () => {
  const hrID = window.sessionStorage.getItem('hrPhone')
  // let navigate = useNavigate()

  const [empName, setEmpName] = useState('')
  const [empEmail, setEmpEmail] = useState('')
  const [empPhone, setEmpPhone] = useState('')
  const [empSal, setEmpSal] = useState('')

  const createUser = (e) => {
    e.preventDefault()
    var EmployeeData = {
      empName: empName,
      empEmail: empEmail,
      hrID: hrID,
      empPhone: empPhone,
      empSal: empSal,
    }
    console.log(EmployeeData)
    axios
      .post(`http://127.0.0.1:8000/createEmployee`, EmployeeData)
      .then((res) => {
        // eslint-disable-next-line
        if (res.data.Response == 'Employee Added Succesfully') {
          // let path = `/home`
          // navigate(path)
          window.location.href = '/home'
        } else {
          toast('Please check details')
        }
      })
  }

  return (
    <div className='container' style={{ backgroundColor: '#254677' }}>
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
      <h1 className='title' style={{ color: '#fff' }}>
        Add Employee
      </h1>
      <div className='loginContainer'>
        <input
          name='empName'
          id='empName'
          placeholder='Name'
          autoComplete='off'
          type={'text'}
          className='inputField'
          value={empName}
          onChange={(e) => {
            setEmpName(e.target.value)
          }}
        ></input>
        <input
          name='empEmail'
          id='empEmail'
          placeholder='Email'
          className='inputField'
          autoComplete='off'
          type={'email'}
          value={empEmail}
          onChange={(e) => {
            setEmpEmail(e.target.value)
          }}
        ></input>
        <input
          name='empPhone'
          id='empPhone'
          placeholder='Phone'
          className='inputField'
          autoComplete='off'
          type={'number'}
          value={empPhone}
          onChange={(e) => {
            setEmpPhone(e.target.value)
          }}
        ></input>
        <input
          name='salary'
          id='salary'
          placeholder='salary'
          className='inputField'
          autoComplete='off'
          type={'number'}
          value={empSal}
          onChange={(e) => {
            setEmpSal(e.target.value)
          }}
        ></input>

        <button className='btn' type='button' onClick={createUser}>
          Create User
        </button>
      </div>
    </div>
  )
}

export default CreateEmployee
