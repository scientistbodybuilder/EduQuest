import React, { useState, useEffect } from 'react'
import  { Link } from 'react-router-dom'
const Header = () => {

    return(
        <div className='w-full top-0 h-16 flex items-center justify-between shadow-md border-b border-[#ccc] px-3 py-1'>
            <Link to="/"><h2 className='font-semibold text-lg md:text-xl lg:text-2xl xl:text-3xl text-gray-800'>EduQueest</h2></Link>

            <div className='flex items-center justify-center gap-5'>
                <Link to={"/"}><h3 className='font-medium xl:text-xl md:text-lg text-base text-gray-800'>Dashboard</h3></Link>
                <Link to={"/upload"}><h3 className='font-medium xl:text-xl md:text-lg text-base text-gray-800'>Upload</h3></Link>
                <Link to={"/account"}><h3 className='font-medium xl:text-xl md:text-lg text-base text-gray-800'>Account</h3></Link>
            </div>

        </div>
    )
}

export default Header