import React from 'react';
import { supabase } from '../../utils/supabaseClient';

export default function Login() {
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/home`,
      },
    });

    if (error) console.error('Login error:', error);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <button 
        onClick={handleLogin} 
        >
        Login with Google
      </button>
    </div>
  );
}