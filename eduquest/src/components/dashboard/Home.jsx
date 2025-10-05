import React, { useState, useEffect } from 'react'
import Header from '../Header'
import { UserAuth } from '../../AuthContext'

const Home = () => {
    const { session } = UserAuth()
    console.log('session: ', session?.user)
    const [userId, setUserId] = useState(null)
    const [name, setName] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setName(session.user?.user_metadata.full_name)
        setUserId(session.user?.id)
    }, [session])
    const getQuizzes = async (id) => {

    }

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

                <div>
                    
                </div>
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