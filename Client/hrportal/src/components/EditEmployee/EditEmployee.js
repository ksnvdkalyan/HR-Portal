import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// import { useNavigate } from 'react-router-dom'

const EditEmployee = () => {
  let isLoggedIn = window.sessionStorage.getItem('isLoggedIn')
  // let navigate = useNavigate()

  if (!isLoggedIn) {
    sessionStorage.clear()
    // let path = `/`
    // navigate(path)
    window.location.href = '/'
  }

  const sessionHrID = window.sessionStorage.getItem('hrPhone')
  const sessionEmpName = window.sessionStorage.getItem('empName')
  const sessionEmpEmail = window.sessionStorage.getItem('empEmail')
  const sessionEmpPhone = window.sessionStorage.getItem('empPhone')
  const sessionEmpSal = window.sessionStorage.getItem('empSal')

  // eslint-disable-next-line
  const [hrID, setHRID] = useState(sessionHrID)
  const [empName, setEmpName] = useState(sessionEmpName)
  const [empEmail, setEmpEmail] = useState(sessionEmpEmail)
  const [empPhone, setEmpPhone] = useState(sessionEmpPhone)
  const [empSal, setEmpSal] = useState(sessionEmpSal)

  const submitEdit = (e) => {
    e.preventDefault()
    var editData = {
      hrID: hrID,
      empName: empName,
      empEmail: empEmail,
      empPhone: empPhone,
      empSal: empSal,
    }

    axios.put(`http://127.0.0.1:8000/updateEmployee`, editData).then((res) => {
      // eslint-disable-next-line
      if (res.data.Response == 'Employee Updated') {
        // let path = `/home`
        // navigate(path)
        window.location.href = '/home'
      } else {
        toast('Please try again')
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
        Edit Employee Details
      </h1>
      <div className='loginContainer'>
        <input
          name='empName'
          id='empName'
          placeholder='Employee Name'
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
          readOnly
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
          value={empPhone}
          onChange={(e) => {
            setEmpPhone(e.target.value)
          }}
        ></input>
        <input
          name='empSal'
          id='empSal'
          placeholder='Salary'
          className='inputField'
          value={empSal}
          onChange={(e) => {
            setEmpSal(e.target.value)
          }}
        ></input>

        <button className='btn' type='button' onClick={submitEdit}>
          Submit Edit
        </button>
      </div>
    </div>
  )
}

export default EditEmployee
