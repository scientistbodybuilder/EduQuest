import React, { useState, useEffect } from 'react'
import Header from '../Header'

const Home = () => {
    return(
        <div className='flex-1 w-full flex items-center justify-center bg-amber-200'>
            <h3>EduQuest</h3>
        </div>
    )
}


const HomeExport = () => {
    return(<div className='w-full h-full flex flex-col items-center justify-start'>
        <Header />
        <Home />
    </div>)
}
export default HomeExport