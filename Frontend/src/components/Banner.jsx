import React from 'react'
//import banner from '../../public/Banner.jpg'

export default function Banner() {
  return (
    <>
        <div className="max-w-screen-2x1 container mx-auto md:px-0 px-4 flex flex-col md:flex-row my-10">{/**Means for the devices 
         * of mobile it is column wise flex and the medium it is row wise flex
         */}
            <div className="order-2 md:order-1 w-full md:w-1/2  mt-12 md:mt-32">{/*This means for w-full for the mobile device 
            but (md) is for the medium and above it devices*/}
               <div className='space-y-12'>
               <h1 className='text-4x1 font-bold'>Hello, Welcomes here to learn something 
                <span className='text-pink-400'> new everyday !!!</span>
                </h1>
                <p className='text-2x1'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
                veniam, quis nostrud exercitation ullamco laboris 
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 
                </p>
                <label className="input input-bordered flex items-center gap-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70">
                <path
                    d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path
                    d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input type="text" className="grow" placeholder="Email" />
                </label>
                
               </div>
               <button className="btn btn-secondary mt-6">Secondary</button>
            </div>
            <div className='order-1 w-1/2'>
                <img src="/Banner.jpg" className='w-62 h-62' alt="book" />
            </div>
        </div>
    </>
  )
}
