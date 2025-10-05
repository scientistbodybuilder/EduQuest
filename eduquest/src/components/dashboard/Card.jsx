import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Card = (props) => {
    const navigate = useNavigate()

    const openGame = (id) => {
            console.log('card clicked go to game')
            navigate("/game", { state: { quizId: id} });
    }
    return(
        <div onClick={()=>openGame(props.quizId)} className='border border-[#ccc] bg-white rounded-lg pb-2 w-56 h-32 xl:w-80 xl:h-48 shadow-lg relative flex flex-col items-center justify-center cursor-pointer'>
            <div className='w-full absolute top-0 rounded-tl-lg rounded-tr-lg border-b border-[#ccc] h-6 lg:h-9 xl:mb-2'>
                    
            </div>
            <h3 className='text-xl 2xl:text-3xl font-semibold mb-4 text-gray-800 mt-6 md:mt-4 xl:mt-2'>{props.title}</h3>
            <p className='text-gray-500 text-lg xl:text-xl font-medium'>{props.questions} Questions</p>
        </div>
    )
}

export default Card