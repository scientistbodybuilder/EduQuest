import React, { useState, useEffect } from 'react'
import  { Link, useLocation } from 'react-router-dom'

const Header = () => {
    const location = useLocation();
    const { pathname } = location
    console.log('The current route is: ',pathname)

    return(
        <div className='w-full top-0 h-16 flex items-center justify-between shadow-md border-b-3 border-[#ccc] px-3 py-1 bg-[#2D3D73]'>
            <Link to="/">
                {/* <h2 className='font-semibold text-lg md:text-xl lg:text-2xl xl:text-3xl text-gray-800'>EduQuest</h2> */}
                <img className='h-28 lg:h-32 xl:h-36' src="/Logo.png"/>
            </Link>
            { pathname != '/game' && pathname != '/login' ? (
            <div className='flex items-center justify-center gap-5'>
                <Link to={"/"}><h3 className='font-medium xl:text-xl md:text-lg text-base text-white'>Dashboard</h3></Link>
                <Link to={"/upload"}><h3 className='font-medium xl:text-xl md:text-lg text-base text-white'>Upload</h3></Link>
                <Link to={"/account"}><h3 className='font-medium xl:text-xl md:text-lg text-base text-white'>Account</h3></Link>
            </div>)
            : null
            }

        </div>
    )
}

export default Header