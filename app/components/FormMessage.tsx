import React from 'react'

interface FormMessageProps{
    text: string
}
const FormMessage = ({text}:FormMessageProps) => {
  return (
    <p className='text-red-400 text-[12px] mt-2 font-[500]'>{text}</p>
  )
}

export default FormMessage