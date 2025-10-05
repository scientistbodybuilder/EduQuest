import React, { useState, useEffect } from 'react'

const ChoiceCard = (props) => {
    console.log('text: ',props.text)
    console.log('selected: ', props.selected)
    return(
        <div className={`w-10/12 h-auto cursor-pointer rounded-lg shadow-sm ${props.selected ? 'bg-gray-600' : 'bg-white'} py-1 px-2 mb-2 hover:shadow-md`} onClick={props.click}>
            <p className={`font-medium text-sm md:text-base xl:text-lg ${props.selected ? 'text-white' : 'text-gray-700'}`}>{props.text}</p>
        </div>
    )
}

export default ChoiceCard