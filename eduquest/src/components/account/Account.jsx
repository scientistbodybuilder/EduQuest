import React, { useState, useEffect } from 'react'
import Header from '../Header'
import { UserAuth } from '../../AuthContext'

const Account = () => {
    const { session } = UserAuth()
    const [results, setResults] = useState([])

    const userId = session.user?.id
    const fullName = session.user?.user_metadata.full_name
    const email = session.user?.email
    return(
        <div className='w-full h-full flex flex-col items-center justify-start bg-[#bcc8f1]'>
            <div className='mt-20 w-11/12 lg:w-10/12 flex flex-col items-center justify-start'>
                <div className='w-full h-atuo'>
                    <h3 className='font-bold text-2xl md:text-3xl xl:text-4xl'>Welcome {fullName}</h3>
                    <p className='text-gray-600 text-base lg:text-lg'>Manage your account</p>
                </div>


                <div className='w-full mt-16 border rounded-lg flex flex-col items-center justify-start h-auto'>
                    <div className='rounded-tr-lg rounded-tl-lg h-16 px-4 py-2 bg-[#92a6e8] w-full border-b'>
                        <h2 className='font-semibold xl:text-4xl lg:text-3xl text-2xl'>Summary</h2>
                    </div>

                    <div className='w-full mt-24 mb-8 flex flex-col items-center justify-center'>
                        <label className='font-semibold 2xl:text-3xl xl:text-2xl lg:text-xl text-lg mb-4'>Email</label>
                        <p className='border border-[#ccc] bg-white py-2 rounded-md px-2 w-96 text-2xl'>{email}</p>
                    </div>

                    {results && (<div className='w-11/12 h-auto'>
                            {results?.map((item,index) => {
                                return (<div className='bg-white w-11/12 rounded-md shadow-md px-3 py-1 flex items-center'> </div>)
                            })}

                        </div>)}

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