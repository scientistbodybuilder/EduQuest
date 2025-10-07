import { useState, useEffect } from 'react'
import { supabase } from "./utils/supabaseClient";
import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from './components/login/Login'
import Home from './components/dashboard/Home'
import Game from './components/game/Game'
import Upload from './components/upload/Upload'
import Account from './components/account/Account'

import { AuthContextProvider } from './AuthContext'
import ProtectedRoute from './ProtectedRoutes';

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) setUser(session.user);
    };

    fetchSession();

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <AuthContextProvider>
    <Router>
      <div className='h-screen w-screen m-0 p-0 flex flex-col'>
      <Routes>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/game/:quizId" element={<ProtectedRoute><Game /></ProtectedRoute>} />
          <Route path="/upload" element={<ProtectedRoute><Upload /></ProtectedRoute>} />
          <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
      </Routes>
      </div>
    </Router>
    </AuthContextProvider>
  );
}  
//            <Route path="/" element={!user ? <Login /> : <Navigate to="/home" replace />}/>


export default App