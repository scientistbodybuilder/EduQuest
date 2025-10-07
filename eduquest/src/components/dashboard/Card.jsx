import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Card = (props) => {
    const navigate = useNavigate()

    const openGame = (id) => {
            console.log('card clicked go to game')
            navigate("/game", { state: { quizId: id} });
    }
    return(
        <div onClick={()=>openGame(props.quizId)} className='border-2 border-[#94acf5] bg-white rounded-lg pb-2 w-72 h-44 xl:w-80 xl:h-48 max-w-full shadow-lg hover:shadow-2xl relative flex flex-col items-center justify-center cursor-pointer'>
            <div className='w-full absolute top-0 rounded-tl-md rounded-tr-md border-b bg-[#94acf5] border-[#ccc] h-8 lg:h-9 xl:mb-2'>
                    
            </div>
            <h3 className='text-lg lg:text-xl 2xl:text-2xl font-semibold mb-4 text-gray-800 mt-6 md:mt-4 xl:mt-2 text-wrap text-center'>{props.title}</h3>
            <p className='text-gray-500 text-base lg:text-lg xl:text-xl font-medium'>{props.questions} Questions</p>
        </div>
    )
}

export default Card