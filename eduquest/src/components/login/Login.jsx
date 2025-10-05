import React from 'react';
import { supabase } from '../../utils/supabaseClient';
import { UserAuth } from '../../AuthContext';
import { FcGoogle } from "react-icons/fc";


export default function Login() {
  const { session, oAuth } = UserAuth()
  const oAuthLogin = async () => {
    try {
      await oAuth()
    } catch (err) {
      console.log('Error: ',err)
    }
  };

  return (
    <div className="flex items-center justify-center h-full w-full bg-[#bcc8f1]">
      <div className='w-2/3 lg:w-1/2 xl:w-2/5 2xl:w-1/3 rounded-md shadow-lg px-2 py-1 h-auto flex flex-col items-center justify-center border border-[#ccc]'>
        <h2 className='text-2xl xl:text-3xl 2xl:text-4xl font-semibold mb-20 mt-10'>Login</h2>

        <p className='text-lg mb-6'>Sign in with google</p>
        <label className='w-10/12 rounded-md py-2 px-3 flex items-center justify-center bg-black hover:bg-gray-800 transition-all duration-200 mb-20 cursor-pointer'
        onClick={oAuthLogin} 
        >
        <FcGoogle size={35} />
      </label>
      </div>
    </div>
  );
}