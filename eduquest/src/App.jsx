import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './components/dashboard/Home'
import Game from './components/game/Game'

function App() {
  return (
    <Router>
      <div className='h-screen w-screen m-0 p-0 flex flex-col'>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
      </Routes>
      </div>
    </Router>
  )
}

export default App
