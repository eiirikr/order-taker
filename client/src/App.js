import React from 'react'
import './App.css'
import Navbar from './components/Navbar'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages'
import Products from './pages/products'
import Cart from './pages/cart'
import Ordered from './pages/ordered'
import WaitingList from './pages/waitingList'
import ManageProducts from './pages/manageProduct'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/ordered" element={<Ordered />} />
        <Route path="/waitingList" element={<WaitingList />} />
        <Route path="/manageProduct" element={<ManageProducts />} />
      </Routes>
    </Router>
  )
}
export default App