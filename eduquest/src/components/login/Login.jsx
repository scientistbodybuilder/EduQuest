import React from 'react';
import { supabase } from '../../utils/supabaseClient';
import { UserAuth } from '../../AuthContext';
import { FcGoogle } from "react-icons/fc";
import Header from '../Header';
import bg from '../../assets/backgrounds/game_bg_1.jpg'


const Login = () => {
  const { session, oAuth } = UserAuth()
  const oAuthLogin = async () => {
    try {
      await oAuth()
    } catch (err) {
      console.log('Error: ',err)
    }
  };

  return (
    <div className="flex flex-col gap-24 relative items-center justify-center h-full w-full bg-[#bcc8f1]" style={{backgroundImage: `url(${bg})`}}>
      {/* <div className='absolute top-0 left-2 h-12 flex items-center justify-center'>
        <img className='h-32 xl:h-36' src="/Logo.png" />
      </div> */}
        <p className='font-bold w-1/2 text-3xl xl:text-4xl text-center text-white'>Learning is a battle and we’re gonna help you win it</p>
      <div className='w-2/3 lg:w-1/2 xl:w-2/5 2xl:w-1/3 rounded-md shadow-lg px-2 py-1 h-auto flex flex-col items-center justify-center border bg-white border-[#ccc]'>
        <h2 className='text-2xl xl:text-3xl 2xl:text-4xl font-semibold mb-20 mt-10'>Sign in</h2>

        <p className='text-lg xl:text-xl mb-6'>Sign in with google</p>
        <label className='w-10/12 rounded-md py-2 px-3 flex items-center justify-center bg-black hover:bg-gray-800 transition-all duration-200 mb-20 cursor-pointer'
        onClick={oAuthLogin} 
        >
        <FcGoogle size={35} />
      </label>
      </div>

      <div className='absolute left-0 bottom-0 w-auto h-80 xl:h-100'>
        <img className='max-h-full ' src='/Enemy_wave.png' />
      </div>

      <div className='absolute right-0 bottom-0 w-auto h-80 xl:h-100'>
        <img className='max-h-full' src='/Enemy_wave_2.png' />
      </div>
    </div>
  );
}

const LoginExport = () => {
  return(
    <div className='w-full h-full flex flex-col items-center justify-start'>
      <Header />
      <Login />
    </div>
  )
}

export default LoginExport