import React, { useState, useEffect } from 'react'
import '../../styles/form.css'

const GameMenu = (props) => {

    if (!props.open) {
        return null
    } else {
        return(
            <>
                <div className='overlay' onClick={handleOverlayClick}></div>
                <div className='border border-[#ccc] bg-white w-3/4 md:w-2/3 lg:w-1/2 xl:w-2/5 2xl:w-1/3 flex flex-col items-center justify-center rounded-md modal' onClick={(e) => e.stopPropagation()}>
                        <label className='mt-10 font-semibold text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl py-2 px-2 cursor-pointer text-white w-10/12 bg-gradient-to-r from-purple-600 to-blue-600"'>Play</label>

                        <label className='mt-10 font-semibold text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl py-2 px-2 cursor-pointer text-white w-10/12 bg-gradient-to-r from-purple-600 to-blue-600"'>End Quiz</label>
                </div>
            </>
        )
    }
}

export default GameMenu