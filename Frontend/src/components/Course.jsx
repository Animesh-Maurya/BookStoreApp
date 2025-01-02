import React from 'react'
import list from './list.json'
import Cards from './Cards';
import {Link} from 'react-router-dom'
export default function Course() {
    console.log(list);
  return (
    <>
        <div className='max-w-screen-2x1 container mx-auto md:px-0 px-1'>
            <div className='mt-20 items-center-justify-center text-center'>
                <h1 className='text-2xl font-semibold md:text-4xl'>
                    We are delight to have you <span className='text-pink-500'> Here! :</span>
                </h1>
                <p className='mt-12'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                </p>
                 <Link to='/'> {/*we had taken link from react-router-dom */}
                <button className="btn btn-secondary mt-6" >Back</button>
                </Link>
                
            </div>
            <div className='mt-12 grid grid-cols-1 md:grid-cols-4'>
                {
                    list.map((item) => (
                        <Cards item={item} key={item.id}/>
                    ))
                }
            </div>
        </div>
    </>
  )
}
