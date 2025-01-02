import React from 'react'
import { useForm } from "react-hook-form"

export default function Contact() {

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()
    
      const onSubmit = (data) => console.log(data);

  return (
    <>
        <div className='flex h-screen items-center justify-center border'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1 className='text-2xl'> Contact <span className='text-pink-400'>Us !!!</span></h1>

                {/* Name */}
                <div className='mt-4 space-y-2'>
                <label>Name</label>
                <br />
                <input type='text' placeholder='Enter your name' 
                className="w-80 px-3 py-1 border rounded-md outline-none" 
                {...register("name", { required: true })}/>
                <br />
                {errors.name && <span className='text-sm text-red-500'>This field is required</span>}
                </div>
                {/*Eamil */}
                <div className='mt-4 space-y-2'>
                <label>Email</label>
                <br />
                <input type='text' placeholder='Enter your name' 
                className="w-80 px-3 py-1 border rounded-md outline-none" 
                {...register("email", { required: true })}/>
                <br />
                {errors.email && <span className='text-sm text-red-500'>This field is required</span>}
                </div>

                {/* Subject */}

                <div className='mt-4 space-y-2'>
                <label>Subject</label>
                <br />
                <textarea name="subject" rows="4" cols="50" 
                placeholder="Enter your Subject here..."
                className="w-80 px-3 py-1 border rounded-md outline-none" 
                {...register("subject", { required: true })} />
                <br />
                {errors.subject && <span className='text-sm text-red-500'>This field is required</span>}
                </div>

                {/*Message */}

                <div className='mt-4 space-y-2'>
                <label>Message</label>
                <br />
                <textarea name="Message" rows="8" cols="50" 
                placeholder="Enter your message here..."
                className="w-80 px-3 py-1 border rounded-md outline-none" 
                {...register("message", { required: true })} />
                <br />
                {errors.message && <span className='text-sm text-red-500'>This field is required</span>}
                </div>
                <button className='btn btn-secondary'>
                    Submit
                </button>
            </form>
        </div>
    </>
  )
}
