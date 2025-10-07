import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
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
import EndMenu from './EndMenu'
import { UserAuth } from '../../AuthContext'

import { getQuestions, submitResults } from '../../services/gameServices'

const Game = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { session } = UserAuth()
    const [maxHealth, setMaxHealth] = useState(100)
    const [playerHealth, setPlayerHealth] = useState(100)
    const [enemyHealth, setEnemyHealth] = useState(100)
    const [attackPoints, setAttackPoints] = useState(1)
    const [selected, setSelected] = useState(null)
    const [selectedIndex, setSelectedIndex] = useState(null)
    const [spriteDim, setSpriteDim] = useState(500)
    const [size, setSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const [openPauseModal, setOpenPauseModal] = useState(true)
    const [openEndModal, setOpenEndModal] = useState(false)
    const [questions, setQuestions] = useState([])
    const [questionIndex, setQuestionInedx] = useState(0)
    const [correct, setCorrect] = useState(0)
    const [won, setWon] = useState(false)
    const [uploadingResults, setUploadingResults] = useState(false)
    const [gameOver, setGameOver] = useState(false)
    const [answerSubmitted, setAnswerSubmitted] = useState(false)

    const data = location.state;
    const { quizId } = useParams()
    const userId = session.user?.id
    const audioHurtRef = useRef(null);
    const audioSlashRef = useRef(null)
    const audioBGRef = useRef(null)

    const results = {
        user_id: userId,
        quiz_uuid: quizId
    }

    const playHurtSound = () => {
        audioHurtRef.current.play();
    };

    const playSlashSound = () => {
        audioSlashRef.current.play();
    };

    const closeMenu = () => {
        setOpenPauseModal(false)
        setOpenEndModal(false)
    }

    const endQuiz = () => {
        setQuestionInedx(0)
        navigate("/")
    }

    const restartQuiz = () => {
        setPlayerHealth(maxHealth)
        setEnemyHealth(maxHealth)
        setCorrect(0)
        setWon(false)
        setQuestionInedx(0)
        setOpenEndModal(false)
        navigate(`/game/${quizId}`)
    }

    const fetchQuestions = async () => {
        try {
            const res = await getQuestions(quizId)
            if(res) {
                console.log('questions: ',res)
                console.log('res: ',res.length)
                setQuestions(res)
                setPlayerHealth(res?.length)
                setEnemyHealth(res?.length)
                setMaxHealth(res?.length)
            }
        } catch (err) {

        }
    }

    const uploadResults = async () => {
        try {
            results.won = won
            results.score = `${correct}/${questions.length}`
            const res = await submitResults(results)
        } catch (err) {

        } finally {
            setUploadingResults(false)
        }
        // endQuiz()
    }

    useEffect(() => {
        fetchQuestions() 
    },[])

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

    const bRef = useRef();

    const handleAction = (ani) => {
        if (bRef.current) {
        bRef.current.updateAnimation(ani); // call function inside B
        }
    };

    const Answer = () => {
        console.log('Student submitted an answer: ',selected)
        setAnswerSubmitted(true)
        if (selected == questions[questionIndex].correct_option) {
            setEnemyHealth(Math.max(enemyHealth - attackPoints,0))
            playHurtSound()
            handleAction('hurt')
            setCorrect(prev => prev + 1)
        } else {
            setPlayerHealth(Math.max(playerHealth - attackPoints,0))
            playSlashSound()
            handleAction('attack')
        }
        setSelected(null)
        setSelectedIndex(null)
    }

    useEffect(() => {
        if(openEndModal || !answerSubmitted) return

        if (playerHealth == 0) {
        setUploadingResults(true)
        uploadResults()
        setOpenEndModal(true)
        } else if (enemyHealth == 0) {
            setWon(true)
            handleAction('dying')
            setUploadingResults(true)
            uploadResults()
        } else if (questionIndex < questions.length - 1) {
            console.log('increment questions')
            console.log('old question index: ',questionIndex)
            setQuestionInedx(questionIndex + 1)
        } else if (questionIndex == questions.length - 1) {
            setWon(correct/questions.length >= 5 ? true : false)
            setUploadingResults(true)
            uploadResults()
            setOpenEndModal(true)
        }
        
        setAnswerSubmitted(false)
    },[playerHealth, enemyHealth, answerSubmitted])

    console.log('questiosn index initial: ',questionIndex)
    return(
        <section className='w-full h-full flex flex-col items-center justify-end relative' style={{backgroundImage: `url(${bg})`, backgroundSize: 'cover'}}>
            {/* <audio ref={audioRef} src="" loop /> */}
            <audio ref={audioHurtRef} src={enemy_hurt} />
            <audio ref={audioSlashRef} src={enemy_slash} />
            {!openPauseModal && <audio ref={audioBGRef} src={bg_sound} autoPlay loop/>}
            {questions.length > 0 && (<div className='top-2 md:left-4 absolute h-auto w-11/12 md:w-2/3 lg:w-1/2 xl:w-1/3 border border-[#ccc] rounded-lg shadow-md bg-white px-2 py-4 flex flex-col items-center justify-center'>
                <h3 className='w-10/12 font-semibold text-base md:text-lg xl:text-xl text-center text-blue-500 mb-6'>{questionIndex+1}. {questions[questionIndex]?.question_text}</h3>
                {/* {
                    temp && temp.choices?.map((item,index) => {
                        return <ChoiceCard text={item.text} selected={selectedIndex === index ? true : false} click={() => {
                            setSelectedIndex(index)
                            setSelected(item.letter)
                        }}/>
                    })
                } */}
                <ChoiceCard text={questions[questionIndex]?.option_a} selected={selectedIndex === 0 ? true : false} click={() => {
                            setSelectedIndex(0)
                            setSelected('A')
                        }}/>
                <ChoiceCard text={questions[questionIndex]?.option_b} selected={selectedIndex === 1 ? true : false} click={() => {
                            setSelectedIndex(1)
                            setSelected('B')
                        }}/>
                <ChoiceCard text={questions[questionIndex]?.option_c} selected={selectedIndex === 2 ? true : false} click={() => {
                            setSelectedIndex(2)
                            setSelected('C')
                        }}/>
                <ChoiceCard text={questions[questionIndex]?.option_d} selected={selectedIndex === 3 ? true : false} click={() => {
                            setSelectedIndex(3)
                            setSelected('D')
                        }}/>
                <label className='text-white focus:outline-none bg-blue-400 cursor-pointer mt-2 border-none px-2 py-1 rounded-lg font-medium text-lg md:text-xl lg:text-2xl hover:bg-blue-500 transition-all duration-300' onClick={()=>Answer()}>Submit</label>

            </div>)}

            <div className='h-auto w-11/12 flex items-center justify-center mb-24'>
                <SpriteAnimator displayHeight={spriteDim} displayWidth={spriteDim} ref={bRef} fps={12} end={()=>setOpenEndModal(true)}/>
            </div>

            <div className='absolute right-2 bottom-32 cursor-pointer rounded-md flex items-center justify-center z-10 h-auto xl:px-5 px-4 xl:py-5 py-4' onClick={()=>setOpenPauseModal(true)} style={{backgroundImage: `url(${log})`, backgroundSize: 'cover'}}>
                <FaPause size={40} color='white'/>
            </div>

            {uploadingResults && (<div className='absolute left-2 bottom-32 flex items-center justify-center z-10 h-auto xl:px-5 px-4 xl:py-5 py-4'>
                <img className='h-20 w-20 xl:h-28 xl:w-28' src='/spinner.svg'/>
            </div>)}

            {questions && (<div className='max-w-full w-full h-auto px-4 py-3 absolute bottom-0 bg-gradient-to-r from-[#2D3D73] via-indigo-600 to-purple-600 flex items-center justify-between border'>
                <div className='w-1/2 flex flex-col items-start gap-2'>
                    <h3 className='text-lg md:text-xl xl:text-2xl font-medium text-white'>Player Health</h3>
                    <div className='h-9 md:h-10 xl:h-12 w-2/3 rounded-sm relative mb-2'>
                        <div className='absolute h-full w-full bg-red-700 rounded-md'></div>
                        <div className={`absolute h-full w-full z-10 bg-green-400 rounded-tl-md rounded-bl-md transition-all duration-300 ${playerHealth == questions.length ? 'rounded-tr-md rounded-br-md' : ''}`} style={{width: `${(playerHealth / maxHealth) * 100}%`}}></div>
                    </div>
                </div>

                <div className='w-1/2 flex flex-col items-end gap-2'>
                    <h3 className='text-lg md:text-xl xl:text-2xl font-medium text-white'>Enemy Health</h3>
                    <div className='h-9 md:h-10 xl:h-12 w-2/3 rounded-sm relative mb-2 flex justify-end'>
                        <div className='absolute h-full w-full bg-red-700 rounded-md'></div>
                        <div className={`absolute h-full w-full z-10 bg-green-400 rounded-tr-md rounded-br-md transition-all duration-300 ${enemyHealth == questions.length ? 'rounded-tl-md rounded-bl-md' : ''}`} style={{width: `${(enemyHealth / maxHealth) * 100}%`}}></div>
                    </div>
                </div>
            </div>)}

            <GameMenu open={openPauseModal} onClose={closeMenu} endQuiz={endQuiz} />
            <EndMenu open={openEndModal} onClose={closeMenu} restartQuiz={restartQuiz} endQuiz={endQuiz} />

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