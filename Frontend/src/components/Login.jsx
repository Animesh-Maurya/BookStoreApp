import React from 'react'
import {Link} from 'react-router-dom'
import { useForm } from "react-hook-form"

//we had taken the Model from dasyui for the login page here we can use react hook form
// but we are using the model instead

export default function Login() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => console.log(data)

  return (
    <div>
        <dialog id="my_modal_3" className="modal">
  <div className="modal-box">
    <form onSubmit={handleSubmit(onSubmit)} method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <Link to="/" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</Link>
    
    <h3 className="font-bold text-lg">Login</h3>
    {/* Email*/}
    <div className='mt-4 space-y-2'>
        <sapn> Email</sapn>
        <br />
        <input type="email" placeholder="Enter your Email" 
        className="w-80 px-3 py-1 border rounded-md outline-none" 
        {...register("email", { required: true })} />
        <br />
        {errors.password && <span className='text-sm text-red-500'>This field is required</span>}
    </div>
    {/*Password */}
    <div className='mt-4 space-y-2'>
        <sapn> Password</sapn>
        <br />
        <input type="password" placeholder="Enter your Passowrd" 
        className="w-80 px-3 py-1 border rounded-md outline-none" 
        {...register("password", { required: true })} />
        <br />
        {errors.password && <span className='text-sm text-red-500'>This field is required</span>}
    </div>
    {/* Button */}
    <div className='flex justify-around mt-4'>
        <button className='btn btn-secondary'>
            Login
        </button>
        <p>
            Not Registered? <Link to='/signup' className="underline text-blue-500 cursor-pointer" >Signup</Link>
        </p>
    </div>
    </form>
  </div> 
  
</dialog>
    </div>
  )
}
