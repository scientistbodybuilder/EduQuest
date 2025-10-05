import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import ChoiceCard from './ChoiceCard'
import SpriteAnimator from './SpriteAnimator'
import Header from '../Header'
import bg from '../../assets/backgrounds/game_bg_1.jpg'
import log from '../../assets/backgrounds/log.png'
import enemy_hurt from '../../assets/sound/enemy_hurt_sound.mp3'
import enemy_slash from '../../assets/sound/enemy_slash_sound.mp3'
import bg_sound from '../../assets/sound/test.mp3'
import { FaPause } from "react-icons/fa";
import GameMenu from './GameMenu'

const Game = () => {
    const navigate = useNavigate()
    const [playerHealth, setPlayerHealth] = useState(100)
    const [enemyHealth, setEnemyHealth] = useState(100)
    const [attackPoints, setAttackPoints] = useState(10)
    const [selected, setSelected] = useState(null)
    const [selectedIndex, setSelectedIndex] = useState(null)
    const [spriteDim, setSpriteDim] = useState(500)
    const [size, setSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const [openModal, setOpenModal] = useState(true)
    const [gameState, setGameState] = useState('')
    const [questions, setQuestions] = useState([])

    const audioHurtRef = useRef(null);
    const audioSlashRef = useRef(null)
    const audioBGRef = useRef(null)

    const playHurtSound = () => {
        audioHurtRef.current.play();
    };

    const playSlashSound = () => {
        audioSlashRef.current.play();
    };

    const closeMenu = () => {
        setOpenModal(false)
    }

    const endQuiz = () => {
        navigate("/")
    }

    useEffect(() => {
        const handleResize = () => {
        setSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (size.width >= 1290) {
            setSpriteDim(500)
        } else if (size.width >= 768) {
            setSpriteDim(420)
        } else {
            setSpriteDim(360)
        }
    },[size])

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

    const bRef = useRef();

    const handleAction = (ani) => {
        if (bRef.current) {
        bRef.current.updateAnimation(ani); // call function inside B
        }
    };

    const Answer = () => {
        console.log('Student submitted an answer: ',selected)
        if (selected === temp.answer) {
            console.log("That's correct!")
            setEnemyHealth(Math.max(enemyHealth - attackPoints,0))
            playHurtSound()
            handleAction('hurt')
            console.log('Enemy health: ', enemyHealth)
        } else {
            console.log("That is incorrect")
            setPlayerHealth(Math.max(playerHealth - attackPoints,0))
            playSlashSound()
            handleAction('attack')
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
            handleAction('dying')
        }
    },[enemyHealth])

    return(
        <section className='w-full h-full flex flex-col items-center justify-end relative' style={{backgroundImage: `url(${bg})`, backgroundSize: 'cover'}}>
            {/* <audio ref={audioRef} src="" loop /> */}
            <audio ref={audioHurtRef} src={enemy_hurt} />
            <audio ref={audioSlashRef} src={enemy_slash} />
            {!openModal && <audio ref={audioBGRef} src={bg_sound} autoPlay loop/>}
            <div className='top-2 md:left-4 absolute h-auto w-11/12 md:w-1/2 lg:w-1/3 border border-[#ccc] rounded-lg shadow-md bg-white px-2 py-4 flex flex-col items-center justify-center'>
                <h3 className='font-semibold text-lg md:text-xl xl:text-2xl text-center text-blue-500 mb-6'>{temp?.question}</h3>
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

            <div className='h-auto w-11/12 flex items-center justify-center mb-24'>
                <SpriteAnimator displayHeight={spriteDim} displayWidth={spriteDim} ref={bRef} fps={12}/>
            </div>

            <div className='absolute right-2 bottom-32 cursor-pointer rounded-md flex items-center justify-center z-10 h-auto xl:px-5 px-4 xl:py-5 py-4' onClick={()=>setOpenModal(true)} style={{backgroundImage: `url(${log})`, backgroundSize: 'cover'}}>
                <FaPause size={40} color='white'/>
            </div>

            <div className='max-w-full w-full h-auto px-4 py-3 absolute bottom-0 bg-gray-200 flex items-center justify-between border'>
                <div className='w-1/2 flex flex-col items-start gap-2'>
                    <h3 className='text-lg md:text-xl xl:text-2xl font-medium'>Player Health</h3>
                    <div className='h-9 md:h-10 xl:h-12 w-2/3 rounded-sm relative mb-2'>
                        <div className='absolute h-full w-full bg-red-700 rounded-md'></div>
                        <div className={`absolute h-full w-full z-10 bg-green-400 rounded-tl-md rounded-bl-md transition-all duration-300 ${playerHealth == 100 ? 'rounded-tr-md rounded-br-md' : ''}`} style={{width: `${playerHealth}%`}}></div>
                    </div>
                </div>

                <div className='w-1/2 flex flex-col items-end gap-2'>
                    <h3 className='text-lg md:text-xl xl:text-2xl font-medium'>Enemy Health</h3>
                    <div className='h-9 md:h-10 xl:h-12 w-2/3 rounded-sm relative mb-2 flex justify-end'>
                        <div className='absolute h-full w-full bg-red-700 rounded-md'></div>
                        <div className={`absolute h-full w-full z-10 bg-green-400 rounded-tr-md rounded-br-md transition-all duration-300 ${enemyHealth == 100 ? 'rounded-tl-md rounded-bl-md' : ''}`} style={{width: `${enemyHealth}%`}}></div>
                    </div>
                </div>
            </div>

            <GameMenu open={openModal} onClose={closeMenu} endQuiz={endQuiz} />

        </section>
    )
}

const GameExport = () => {
    return(
        <div className='w-full h-full flex flex-col items-center justify-start'>
            <Header />
            <Game />
        </div>
    )
}


export default GameExport