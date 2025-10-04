import React, { useState, useEffect } from 'react'

const Header = () => {

    return(
        <div className='w-full absolute top-0 h-16 flex items-center justify-between'>
            <h2 className='font-semibold text-xl md:text-2xl lg:text-3xl xl:text-4xl'>EduQueest</h2>

            <div className='flex items-center justify-center gap-5'>
                <h3 className='font-medium xl:text-2xl md:text-lg text-base'>Dashboard</h3>
                <h3 className='font-medium xl:text-2xl md:text-lg text-base'>Upload</h3>
                <h3 className='font-medium xl:text-2xl md:text-lg text-base'>Account</h3>
            </div>

        </div>
    )
}

export default Header