import React, { useState, useEffect } from 'react'
import Header from '../Header'
import { UserAuth } from '../../AuthContext'
import { getQuizzes } from '../../services/dashboardServices'
import '../../styles/grids.css'
import Card from './Card'
import Footer from '../Footer'

const Home = () => {
    const { session } = UserAuth()
    console.log('session: ', session?.user)
    
    const [loading, setLoading] = useState(false)
    const [quizzes, setQuizzes] = useState([])

    const userId = session?.user?.id
    const name = session?.user?.user_metadata?.full_name


    const fetchQuizzes = async (id) => {
        if (!userId) return
        setLoading(true)
        try {
            const res = await getQuizzes(id)
            setQuizzes(res)
        } catch (err) {

        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchQuizzes(userId)
    },[userId])

    useEffect(() => {
        fetchQuizzes(userId)
    },[])

    return(
        <div className='w-full h-full flex flex-col items-center justify-start bg-[#bcc8f1] pb-10'>
            <div className='mt-20 w-11/12 lg:w-10/12 flex flex-col items-center justify-start'>
                <div className='w-full h-atuo'>
                    <h3 className='font-bold text-2xl md:text-3xl xl:text-4xl'>Welcome {name}</h3>
                    <p className='text-gray-600 text-base lg:text-lg'>Select a quiz to begin practicing</p>
                </div>
                <>
                    {loading ? (<img className='h-40 w-40 mt-24' src='/spinner_dark.svg'/>)
                    :
                    (
                        <div className='data'>
                            {quizzes?.length > 0 && quizzes?.map((item,index) => {

                                return <Card title={item.title} key={index} quizId={item.id} questions={item.questions}/>
                            })
                        }

                        </div>
                    )}
                </>

        
            </div>
            
        </div>
    )
}


const HomeExport = () => {
    return(<div className='w-full h-full flex flex-col items-center justify-start overflow-x-hidden'>
        <Header />
        <Home />
        <Footer />
    </div>)
}
export default HomeExport