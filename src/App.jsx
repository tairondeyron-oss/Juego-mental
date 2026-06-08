import React from 'react'
import Inicio from './components/Inicio'
import Layout from './components/Layout'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

export default function  App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />}/>
        <Route path="/principal" element={<Layout />}/>
      </Routes>
    </BrowserRouter>
  )
}