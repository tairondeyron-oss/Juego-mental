import React from 'react'
import Inicio from './components/Inicio'
import Juego from './components/Juego'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

export default function  App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />}/>
        <Route path="/principal" element={<Juego />}/>
      </Routes>
    </BrowserRouter>
  )
}