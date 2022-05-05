import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import './Home.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Home() {
  let isLoggedIn = window.sessionStorage.getItem('isLoggedIn')

  if (!isLoggedIn) {
    sessionStorage.clear()
    window.location.href = '/'
  }

  const hrID = window.sessionStorage.getItem('hrPhone')

  const [employees, setEmployees] = useState([])
  // eslint-disable-next-line
  const [changed, setChanged] = useState(false)

  useEffect(() => {
    getEmployeesData()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    console.log('emp1:', employees)
  }, [employees])

  useEffect(() => {
    console.log('Rerendering')
  }, [changed])

  async function getEmployeesData() {
    let data = await axios.get(`http://127.0.0.1:8000/getEmployee?hrID=${hrID}`)
    setEmployees(data.data)
  }

  const logOut = () => {
    sessionStorage.clear()
    // let path = `/`
    // navigate(path)
    window.location.href = '/'
  }

  const gotoCreateEmployee = (e) => {
    window.location.href = '/create'
  }

  return (
    <div className='homeContainer'>
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
      <div className='Header'>
        <h1 className='homePageLogo'>HRPortal</h1>
        <div className='homeButtonsContainer'>
          <button
            className='btn addEmployeeButton'
            type='button'
            onClick={gotoCreateEmployee}
          >
            Add Employee
          </button>
          <button className='btn logoutButton' type='button' onClick={logOut}>
            Logout
          </button>
        </div>
      </div>
      <div className='tableContainer'>
        <table className='homeTable'>
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Employee Email</th>
              <th>Employee Phone</th>
              <th>Employee Salary</th>
              <th>Employee HR ID</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.empName}>
                <td>{employee.empName} </td>
                <td>{employee.empEmail}</td>
                <td>{employee.empPhone}</td>
                <td>{employee.empSal}</td>
                <td>{employee.hrID}</td>
                <button
                  className='btn addEmployeeButton tableButtons'
                  type='button'
                  onClick={(e) => {
                    e.preventDefault()
                    window.sessionStorage.setItem('empName', employee.empName)
                    window.sessionStorage.setItem('empEmail', employee.empEmail)
                    window.sessionStorage.setItem('empPhone', employee.empPhone)
                    window.sessionStorage.setItem('empSal', employee.empSal)
                    // let path = `/edit`
                    // navigate(path)
                    window.location.href = '/edit'
                  }}
                >
                  Edit
                </button>
                <button
                  className='btn logoutButton tableButtons'
                  type='button'
                  onClick={(e) => {
                    e.preventDefault()
                    axios
                      .delete(
                        `http://127.0.0.1:8000/deleteEmployee?empEmail=${employee.empEmail}`
                      )
                      .then((res) => {
                        // eslint-disable-next-line
                        if (
                          // eslint-disable-next-line
                          res.data.message == 'Employee Deleted Succesfully'
                        ) {
                          // let path = `/home`
                          // navigate(path)
                          window.location.reload()
                        } else {
                          toast('Some Issue in Deleting')
                        }
                      })
                  }}
                >
                  Delete
                </button>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Home
