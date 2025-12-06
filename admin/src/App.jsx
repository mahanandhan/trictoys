import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import Dashboard from './components/Dashboard'
import AddProductPage from './pages/AddProductPage'
import ProductList from './pages/ProductList'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/addproduct' element={<AddProductPage />} />
        <Route path='/productlist' element={<ProductList />} />
      </Routes>
    </div>
  )
}

export default App
