import React from 'react'
import { useState } from 'react'
import {  useDispatch } from  'react-redux'
import {useForm} from 'react-hook-form'
import {Link, useNavigate} from 'react-router-dom'
import authService from '../appwrite/auth'

import {login as authLogin} from '../store/authSlice'
import {Logo, Input, Button} from './index'

function Signup() {

  const [error, setError] = useState("")
  const dispatch = useDispatch()
  const {register, handleSubmit} = useForm()
  const navigate = useNavigate()

  const signup = async(data)=>{
    setError("")
    try {
      const userAccount = await authService.createAccount(data)
      if(userAccount){
        const userData = await authService.getUserData()
        
        if(userData){
          dispatch(authLogin(userData))
          navigate("/")
        } 
          
      }
    } catch (error) {
      setError(error)
    }
  }

  return (
    <div className='w-full flex items-center flex-col text-white bg-[#202225] py-10 gap-5'>
    <div className='underline underline-offset-4'>
      <Logo/>
    </div>
    <h2 className="text-center text-2xl font-bold leading-tight">
        Sign up to your account
      </h2>
    {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
    <form className='flex flex-col' onSubmit={handleSubmit(signup)}>
      <Input
        label="Name: "
        type="name"
        className=""
        placeholder="Enter name"
        {...register("name", {
          required: true
        })}
        />

      <Input
        label="email: "
        type="email"
        className=""
        placeholder="Enter Email"
        {...register("email", {
          required: true
        })}
      />
      <Input
        label="password: "
        type="password"
        className=""
        placeholder="Enter password"
        {...register("password", {
          required: true
        })}
      />
        <p className="my-2 text-center text-base ">
          Already have any account?&nbsp;
          <Link
          to="/login"
          className="font-medium text-primary transition-all duration-200 hover:underline"
          >
          Sign In
        </Link>
      </p>
      <Button
        children="Submit"
        type='submit'
        className=''
      />
    </form>
  </div>
)
}

export default Signup