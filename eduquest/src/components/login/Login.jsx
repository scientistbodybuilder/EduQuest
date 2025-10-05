import React from 'react';
import { supabase } from '../../utils/supabaseClient';

export default function Login() {
  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/home`,
      },
    });

    if (error) console.error('Login error:', error);
    else console.log('Login data:', data);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mb-6 block">Welcome to EduQuest!</h1>
        <br/>
        <button 
            onClick={handleLogin} 
            className="gap-2"
        >
        Login with Google
        </button>
    </div>
  );
}