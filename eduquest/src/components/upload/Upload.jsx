import React, { useState, useEffect } from 'react'
import Header from '../Header'
import { FaUpload } from "react-icons/fa";


const Upload = () => {
    const [loading, setLoading] = useState(false)

    const UploadDocument = async () => {
        console.log('User is uploading pdf')
    }

    return(
        <div className='w-full h-full flex flex-col items-center justify-start'>
            <div className='mt-20 w-11/12 lg:w-10/12 flex flex-col items-center justify-start'>
                <div className='w-full h-atuo'>
                    <h3 className='font-bold text-2xl md:text-3xl xl:text-4xl'>Upload a Document</h3>
                    <p className='text-gray-400 text-base lg:text-lg'>Select any PDF file to upload</p>
                </div>

                <div className='mt-24 w-3/4 md:w-2/3 lg:w-1/2 xl:w-2/5 2xl:w-1/3 flex flex-col items-center justify-center h-auto'>
                    <div className='border w-full h-120 rounded-lg border-gray-200 bg-gray-100 shadow-md flex justify-center items-center cursor-pointer' onClick={()=>UploadDocument()}>
                        <FaUpload color='gray' size={80}/>
                    </div>
                    <div className='w-full h-auto'>
                        <p className='text-gray-400 text-lg mt-4'>Maximum upload size: 20 MB</p>
                    </div>
                </div>
                
            </div>
            
        </div>
    )
}

const UploadExport = () => {
    return(
        <div className='w-full h-full flex flex-col items-center justify-start'>
            <Header />
            <Upload />
        </div>
    )
}

export default UploadExport