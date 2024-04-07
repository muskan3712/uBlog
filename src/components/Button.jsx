import React from 'react'

function Button({
    children,
    type="button",
    className='',
    bgColor="bg-pink-600 hover:bg-pink-300",
    ...props
}) {
  return (
    <button
    type={type} 
    className={`py-2 text-white-800 font-bold ${bgColor} duration-200 rounded-md  hover:text-red-900 ${className}`}
    {...props}
    >{children}</button>
  )
}

export default Button