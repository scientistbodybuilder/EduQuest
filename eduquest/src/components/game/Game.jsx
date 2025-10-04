import React, { useState, useEffect } from 'react'
import ChoiceCard from './ChoiceCard'

const Game = () => {
    const [playerHealth, setPlayerHealth] = useState(100)
    const [enemyHealth, setEnemyHealth] = useState(100)
    const [attackPoints, setAttackPoints] = useState(10)
    const [selected, setSelected] = useState(null)
    const [selectedIndex, setSelectedIndex] = useState(null)

    const temp = {
        question: "Which city is University of Toronto located?",
        choices: [
            {   text: "Toronto",
                letter: "A"
            },
            {   text: "Hamilton",
                letter: "B"
            },
            {   text: "Kingston",
                letter: "C"
            },
            {   text: "Kitchener",
                letter: "D"
            },
        ],
        answer: "A"
    }

    const Answer = () => {
        console.log('Student submitted an answer: ',selected)
        if (selected === temp.answer) {
            console.log("That's correct!")
            setEnemyHealth(Math.max(enemyHealth - attackPoints,0))
            console.log('Enemy health: ', enemyHealth)
        } else {
            console.log("That is incorrect")
            setPlayerHealth(Math.max(playerHealth - attackPoints,0))
            console.log('Player health: ',playerHealth)
        }
    }

    useEffect(() => {
        if (playerHealth == 0) {
            console.log("Player has lost")
        }
    },[playerHealth])

    useEffect(() => {
        if (enemyHealth == 0) {
            console.log("Player has won")
        }
    },[enemyHealth])

    return(
        <section className='w-full h-full flex flex-col items-center justify-center relative'>
            <div className='top-2 md:left-4 absolute h-auto w-11/12 md:w-1/2 lg:w-1/3 border border-[#ccc] rounded-lg shadow-md bg-white px-2 py-4 flex flex-col items-center justify-center'>
                <h3 className='font-semibold text-lg md:text-xl xl:text-2xl text-blue-400 mb-6'>{temp?.question}</h3>
                {
                    temp && temp.choices?.map((item,index) => {
                        return <ChoiceCard text={item.text} selected={selectedIndex === index ? true : false} click={() => {
                            setSelectedIndex(index)
                            setSelected(item.letter)
                        }}/>
                    })
                }
                <label className='text-white focus:outline-none bg-blue-400 cursor-pointer mt-2 border-none px-2 py-1 rounded-lg font-medium text-lg md:text-xl lg:text-2xl hover:bg-blue-500 transition-all duration-300' onClick={()=>Answer()}>Submit</label>

            </div>

            <div>

            </div>

            <div className='max-w-full w-full h-auto px-4 py-3 absolute bottom-0 bg-gray-300 flex items-center justify-between border'>
                <div className='w-1/2 flex flex-col items-start gap-2'>
                    <h3 className='text-lg md:text-xl xl:text-2xl font-medium'>Player Health</h3>
                    <div className='h-9 md:h-10 xl:h-12 w-2/3 rounded-sm relative mb-2'>
                        <div className='absolute h-full w-full bg-red-700 rounded-sm'></div>
                        <div className={`absolute h-full w-full z-10 bg-green-500 rounded-tl-sm rounded-bl-sm transition-all duration-300 ${playerHealth == 100 ? 'rounded-tr-sm rounded-br-sm' : ''}`} style={{width: `${playerHealth}%`}}></div>
                    </div>
                </div>

                <div className='w-1/2 flex flex-col items-end gap-2'>
                    <h3 className='text-lg md:text-xl xl:text-2xl font-medium'>Enemy Health</h3>
                    <div className='h-9 md:h-10 xl:h-12 w-2/3 rounded-sm relative mb-2 flex justify-end'>
                        <div className='absolute h-full w-full bg-red-700 rounded-sm'></div>
                        <div className={`absolute h-full w-full z-10 bg-green-500 rounded-tr-sm rounded-br-sm transition-all duration-300 ${enemyHealth == 100 ? 'rounded-tl-sm rounded-bl-sm' : ''}`} style={{width: `${enemyHealth}%`}}></div>
                    </div>
                </div>
            </div>

        </section>
    )
}


export default Game