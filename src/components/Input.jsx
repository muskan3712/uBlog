import React,{useId} from 'react'

const Input = React.forwardRef(({
    label,
    type="text",
    className='',
    ...props
},ref)=>{
    const id = useId()
    return (
       <div className='flex flex-col'>
        {label && <label
        className='mb-1'
        htmlFor={id}>
            {label}
        </label>}
        <input 
        type={type} 
        className={`text-black p-2 min-w-72 mb-3 rounded-md ${className}`}
        ref={ref}
        {...props}
        id={id}
        />
       </div>
    )
})

export default Input