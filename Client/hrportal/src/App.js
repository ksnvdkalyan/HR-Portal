import './App.css'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import CreateEmployee from './components/CreateEmployee/CreateEmployee'
import EditEmployee from './components/EditEmployee/EditEmployee'
import Error from './components/Error/Error'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Login />} />

        <Route exact path='/register' element={<Register />} />

        <Route exact path='/home' element={<Home />} />

        <Route exact path='/create' element={<CreateEmployee />} />

        <Route exact path='/edit' element={<EditEmployee />} />

        <Route exact path='*' element={<Error />} />
      </Routes>
    </Router>
  )
}

export default App
