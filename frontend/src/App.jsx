import React from 'react'
import Login from './pages/Login'
import { Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Dashboard from './components/Dashboard'
import ViewDetails from './components/ViewDetails'
import CartPage from './pages/CartPage'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/viewdetails' element={<ViewDetails />} />
        <Route path='/cart' element={<CartPage />} />
      </Routes>
    </div>
  )
}

export default App
