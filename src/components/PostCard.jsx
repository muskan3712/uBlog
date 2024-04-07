import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'
import images from './images'

function PostCard({$id, title}) {

  const [randomImage, setRandomImage] = useState({})

  useEffect(()=>{
    let randomIndex = Math.floor(Math.random() * images.length)
    setRandomImage(images[randomIndex])
  }, [])
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-60 scale-100 hover:scale-105 h-72 flex flex-col shadow-lg shadow-gray-700 items-center duration-300 text-white rounded-xl'>
        <img className='w-full h-[70%] rounded-t-xl'  src={randomImage.url} alt='random Image'/> 
            <h2
            className='text-xl font-bold p-8'
            >{title}</h2>
        </div>
    </Link>
  )
}


export default PostCard