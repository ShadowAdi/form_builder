import React from 'react'
import { FaSpinner } from 'react-icons/fa'

const Loading = () => {
  return (
    <div className='flex items-center justify-center w-full h-full'>
        <FaSpinner className='h-12 w-12 animate-spin '/>
    </div>
  )
}

export default Loading