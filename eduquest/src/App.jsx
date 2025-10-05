import { useState } from 'react'
import './App.css'
import "@fontsource/inter";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './components/dashboard/Home'
import Game from './components/game/Game'
import Upload from './components/upload/Upload'
import Account from './components/account/Account'

function App() {
  return (
    <Router>
      <div className='h-screen w-screen m-0 p-0 flex flex-col'>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/account" element={<Account />} />
      </Routes>
      </div>
    </Router>
  )
}

export default App
