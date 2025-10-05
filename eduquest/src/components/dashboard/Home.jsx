import React, { useState, useEffect } from 'react'
import Header from '../Header'
import { UserAuth } from '../../AuthContext'
import { getQuizzes } from '../../services/dashboardServices'
import Card from './Card'

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
        setLoading(true)
        try {
            getQuizzes(id)
        } catch (err) {
            console.error('Error getting quizes: ',err)
        } finally {
            setLoading(false)
        }
        
    },[])

    return(
        <div className='w-full h-full flex flex-col items-center justify-start bg-[#bcc8f1]'>
            <div className='mt-20 w-11/12 lg:w-10/12 flex flex-col items-center justify-start'>
                <div className='w-full h-atuo'>
                    <h3 className='font-bold text-2xl md:text-3xl xl:text-4xl'>Welcome {name}</h3>
                    <p className='text-gray-600 text-base lg:text-lg'>Select a quiz to begin practicing</p>
                </div>
                <>
                    {loading ? (<div className='mt-28 h-44 w-44 flex items-center justify-center'><img className='max-h-full' src='/spinner.svg'/></div>)
                    :
                    (
                        <div className='grid w-full mt-16 grid-cols-4 gap-4'>
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
    return(<div className='w-full h-full flex flex-col items-center justify-start'>
        <Header />
        <Home />
    </div>)
}
export default HomeExport