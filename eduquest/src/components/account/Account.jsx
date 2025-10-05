import React, { useState, useEffect } from 'react'
import Header from '../Header'
import { UserAuth } from '../../AuthContext'

const Account = () => {
    const { session } = UserAuth()
    const [userId, setUserId] = useState(null)
    const [name, setName] = useState(null)

    useEffect(() => {
        setUserId(session.user?.id)
        setName(session.user?.user_metadata.full_name)
    }, [session])
    return(
        <div className='w-full h-full flex flex-col items-center justify-start bg-[#bcc8f1]'>
            <div className='mt-20 w-11/12 lg:w-10/12 flex flex-col items-center justify-start'>
                <div className='w-full h-atuo'>
                    <h3 className='font-bold text-2xl md:text-3xl xl:text-4xl'>Welcome {name}</h3>
                    <p className='text-gray-600 text-base lg:text-lg'>Manage your account</p>
                </div>

                <div>
                    
                </div>
            </div>
            
        </div>
    )
}

const AccountExport = () => {
    return(
        <div className='w-full h-full flex flex-col items-center justify-start'>
            <Header />
            <Account />
        </div>
    )
}

export default AccountExport