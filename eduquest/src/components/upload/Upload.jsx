import React, { useState, useEffect } from 'react'
import Header from '../Header'
import { FaUpload } from "react-icons/fa";
import ComprehensionForm from './ComprehensionForm';


const Upload = () => {
    const [loading, setLoading] = useState(false)
    const [file, setFile] = useState(null)
    const [openForm, setOpenForm] = useState(false)
    const [typeError, setTypeError] = useState(false)


    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.type == 'application/pdf') {
            console.log(e.target.files)
            setFile(e.target.files[0])
            setTypeError(false)
            setOpenForm(true)
        } else if (e.target.files.type != 'application/pdf') {
            setTypeError(true)
        }
    }

    const CloseForm = () => {
        setFile(null)
        setOpenForm(false)
    }

    return(
        <div className='w-full h-full flex flex-col items-center justify-start'>
            <div className='mt-20 w-11/12 lg:w-10/12 flex flex-col items-center justify-start'>
                <div className='w-full h-atuo'>
                    <h3 className='font-bold text-2xl md:text-3xl xl:text-4xl'>Upload a Document</h3>
                    <p className='text-gray-400 text-base lg:text-lg'>Select any PDF file to upload</p>
                </div>

                <div className='mt-24 w-3/4 md:w-2/3 lg:w-1/2 xl:w-2/5 2xl:w-1/3 flex flex-col items-center justify-center h-auto'>
                    <label className='border w-full h-120 rounded-lg border-gray-200 bg-gray-100 shadow-md flex justify-center items-center cursor-pointer'>
                        <FaUpload color='gray' size={80}/>
                        <input type='file' onChange={handleFileChange} className='hidden' />
                    </label>
                    <div className='w-full h-auto'>
                        <p className='text-gray-400 text-base md:text-lg mt-4'>Maximum upload size: 20 MB</p>
                        {typeError && (<p className='text-red-600 text-base md:text-lg mt-2'>File was not of type PDF</p>)}
                    </div>
                </div>
                
            </div>

            {file != null && <ComprehensionForm open={openForm} onClose={CloseForm} file={file} />}
            
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