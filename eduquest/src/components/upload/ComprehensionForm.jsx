import React, { useState, useEffect } from 'react'
import '../../styles/form.css'
import { useForm } from 'react-hook-form';


const ComprehensionForm = (props) => {
    const { register, handleSubmit } = useForm()
    const [comprehensionLevel, setComprehensionLevel] = useState('Kindergarten')
    const [loading, setLoading] = useState(false)
    const [submitSuccess, setSubmitSuccess] = useState(null)

    const handleOverlayClick = (e) => {
        // Only close if the clicked element is the overlay itself
        if (e.target === e.currentTarget) {
            props.onClose();
        }
    };

    const onSubmit = async () => {
        console.log('User is uploading pdf')
        if (props.file) {
            
        }
    }

    const handleComprehensionChange = (e) => {
        const level = e.target.value
        console.log('The selected comprehension level: ',level)
        setComprehensionLevel(level)
    }
    if (!props.open) {
        return null
    } else {
        console.log('Opening modal for upload')
        return(
            <>
                <div className='overlay' onClick={handleOverlayClick}></div>
                <form className='border border-[#ccc] bg-white w-3/4 md:w-2/3 lg:w-1/2 xl:w-2/5 2xl:w-1/3 flex flex-col items-center justify-center rounded-md new-order' onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit(onSubmit)}>
                    <div className='w-full flex items-center justify-end h-auto px-4 py-1 mb-10 mt-2'>
                        <label className='font-semibold text-lg xl:text-xl cursor-pointer text-gray-700 hover:text-gray-500' onClick={props.onClose}>Cancel</label>
                    </div>

                    <div className='w-10/12 px-2 mb-8 flex flex-col items-center justify-start'>
                        <label className='font-medium text-base md:text-lg 2xl:text-xl mb-2'>Your Comprehension Level for this Topic</label>
                        <select className='px-3 py-2 rounded-lg font-medium text-base md:text-lg w-full border border-[#ccc] focus:outline-none' onChange={handleComprehensionChange}>
                            <option className=''>Kindergarten</option>
                            <option className=''>Grade 1</option>
                            <option className=''>Grade 2</option>
                            <option className=''>Grade 3</option>
                            <option className=''>Grade 4</option>
                            <option className=''>Grade 5</option>
                            <option className=''>Grade 6</option>
                            <option className=''>Grade 7</option>
                            <option className=''>Grade 8</option>
                            <option className=''>Grade 9</option>
                            <option className=''>Grade 10</option>
                            <option className=''>Grade 11</option>
                            <option className=''>Grade 12</option>
                            <option className=''>University</option>
                        </select>
                    </div>

                    <div className='w-10/12 px-2 mb-8 flex flex-col items-center justify-center'>
                        {!loading && submitSuccess != 'success' && (<input className='text-white w-full h-auto py-2 px-2 bg-gray-700 hover:bg-gray-500 transition-all duration-300 font-semibold text-lg xl:text-xl rounded-lg cursor-pointer shadow-sm' type='submit' value="Upload"/>)}
                        {!loading && submitSuccess == 'fail' && (<p className='text-red-800 mt-2'>Upload Failed</p>)}
                        {!loading && submitSuccess == 'success' && (<p className='text-green-500 mt-2'>Upload Successful!</p>)}
                        {loading && (<img className='h-9 w-9' src='/spinner.svg' />)}
                    </div>
                </form>
            </>
        )
    }
}


export default ComprehensionForm