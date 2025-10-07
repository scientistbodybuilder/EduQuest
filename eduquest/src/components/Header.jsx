import React, { useState, useEffect } from 'react'
import  { Link, useLocation } from 'react-router-dom'
import { UserAuth } from '../AuthContext';

const Header = () => {
    const { session, signOut } = UserAuth()
    const location = useLocation();
    const { pathname } = location
    console.log('The current route is: ',pathname)

    return(
        <div className='w-full top-0 h-16 flex items-center justify-between shadow-md border-b-3 border-[#ccc] px-4 py-2 bg-gradient-to-r from-[#2D3D73] via-indigo-600 to-purple-600'>
            <Link to="/">
                <h2 className='font-extrabold text-lg md:text-xl lg:text-2xl xl:text-3xl text-white'>EduQuest</h2>
                {/* <img className='h-28 lg:h-32 xl:h-36' src="/Logo.png"/> */}
            </Link>
            { pathname != '/game' && pathname != '/login' ? (
            <div className='flex items-center justify-center gap-3 xl:gap-5'>
                <Link to={"/"}><h3 className='font-medium xl:text-xl md:text-lg text-sm text-white'>Dashboard</h3></Link>
                <Link to={"/upload"}><h3 className='font-medium xl:text-xl md:text-lg text-sm text-white'>Upload</h3></Link>
                <Link to={"/account"}><h3 className='font-medium xl:text-xl md:text-lg text-sm text-white'>Account</h3></Link>
                <h3 onClick={()=>signOut()} className='cursor-pointer font-medium xl:text-xl md:text-lg text-sm text-white'>Sign Out</h3>
            </div>)
            : null
            }

        </div>
    )
}

export default Header