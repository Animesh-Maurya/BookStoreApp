import React from 'react'
import {Link} from 'react-router-dom'
import Login from './Login'
import { useForm } from "react-hook-form"
export default function Signup() {

  const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm()
  
    const onSubmit = (data) => console.log(data)
  

  return (
    <>
        
        <div className='flex h-screen items-center justify-center border'>
        <div className="w-[500px]">
  <div className="modal-box">
    <form onSubmit={handleSubmit(onSubmit)} method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <Link to="/" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</Link>
    
    <h3 className="font-bold text-lg">Signup</h3>
    {/*Name */}
    <div className='mt-4 space-y-2'>
        <sapn> Name</sapn>
        <br />
        <input type="text" placeholder="Enter your FullName" 
        className="w-80 px-3 py-1 border rounded-md outline-none" 
        {...register("name", { required: true })}/>
        <br />
        {errors.name && <span className='text-sm text-red-500'>This field is required</span>}
    </div>
    {/* Email*/}
    <div className='mt-4 space-y-2'>
        <sapn> Email</sapn>
        <br />
        <input type="email" placeholder="Enter your Email" 
        className="w-80 px-3 py-1 border rounded-md outline-none" 
        {...register("email", { required: true })}/>
        <br />
        {errors.email && <span className='text-sm text-red-500'>This field is required</span>}
    </div>
    {/*Password */}
    <div className='mt-4 space-y-2'>
        <sapn> Password</sapn>
        <br />
        <input type="password" placeholder="Enter your Passowrd" 
        className="w-80 px-3 py-1 border rounded-md outline-none" 
        {...register("password", { required: true })}/>
        <br />
        {errors.password && <span className='text-sm text-red-500'>This field is required</span>}
    </div>
    {/* Button */}
    <div className='flex justify-around mt-4'>
        <button className='btn btn-secondary'>
            Signup
        </button>
        <p>
            Have An Account? <button className="underline text-blue-500 cursor-pointer" 
            onClick={() => 
                document.getElementById("my_modal_3").showModal()
              }>Login</button>
              <Login />
        </p>
    </div>
    </form>
  </div> 
</div>
    </div>
        
    </>
  )
}
