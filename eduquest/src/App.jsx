import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { supabase } from "./utils/supabaseClient";
import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from './components/login/login'
import Home from './components/dashboard/Home'
import Game from './components/game/Game'

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
    <Router>
        <Routes>
            <Route path="/" element={!user ? <Login /> : <Navigate to="/home" replace />}/>
            <Route path="/home" element={<Home />} />
            <Route path="/game" element={<Game />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    </Router>
  );
}  

export default App