import React from 'react'
import  authService  from '../appwrite/auth'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import {login as authLogin} from '../store/authSlice'
import {Logo, Input, Button} from './index'
import {Link, useNavigate} from 'react-router-dom'
import { useState } from 'react'
// import { }

function Login() {

  const [error, setError] = useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {register, handleSubmit} = useForm()
  const authUser = useSelector(state => state.auth.userData)
  
  
  
  const login = async (data) => {
    console.log(data)
    setError("");
    try {
      const session = await authService.login(data)
      if (session) {
        const userData = await authService.getUserData();
        console.log("Login: userData", userData)
        if (userData)  dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };


  return (
    <div className='w-full flex items-center flex-col text-white bg-[#202225] py-10 gap-5'>
      <div className='underline underline-offset-4'>
        <Logo/>
      </div>
      <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
      
      <form className='flex flex-col' onSubmit={handleSubmit(login)}>
        <Input
          label="email: "
          type="email"
          className=""
          placeholder="Enter Email"
          {...register("email", {
                    required: true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
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
            Don&apos;t have any account?&nbsp;
            <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
            >
            Sign Up
          </Link>
        </p>
        <Button
          children="Submit"
          type='submit'
        />
      </form>
    </div>
  )
}

export default Login