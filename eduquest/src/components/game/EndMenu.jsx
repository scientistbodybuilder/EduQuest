import React, { useState, useEffect } from 'react'
import '../../styles/form.css'

const EndMenu = (props) => {

     const handleOverlayClick = (e) => {
        // Only close if the clicked element is the overlay itself
        if (e.target === e.currentTarget) {
            props.onClose();
        }
    };

    if (!props.open) {
        return null
    } else {
        return(
            <>
                <div className='overlay'></div>
                <div className='border border-[#ccc] bg-white w-2/3 md:w-1/2 lg:w-2/5 xl:w-1/3 2xl:w-1/4 flex flex-col items-center justify-center rounded-md modal' onClick={(e) => e.stopPropagation()}>
                <h3 className='mt-8 font-medium text-lg md:text-xl lg:text-2xl xl:text-3xl text-purple-900'>Quiz Completed!</h3>
                        <label className='mt-10 hover:shadow-lg text-center rounded-md font-semibold text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl py-2 px-2 cursor-pointer text-white w-10/12 bg-gradient-to-r from-purple-600 to-blue-600' onClick={()=>props.restartQuiz()}>Try Again</label>

                        <label className='mt-10 hover:shadow-lg text-center rounded-md mb-10 font-semibold text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl py-2 px-2 cursor-pointer text-white w-10/12 bg-gradient-to-r from-purple-600 to-blue-600' onClick={()=>props.endQuiz()}>Exit Quiz</label>
                </div>
            </>
        )
    }
}

export default EndMenu