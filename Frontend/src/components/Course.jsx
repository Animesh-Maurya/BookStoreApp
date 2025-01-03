import React,{useState,useEffect} from 'react'
// import list from './list.json' it is used when we are taking the data from the frontend
import Cards from './Cards';
import axios from "axios";
import {Link} from 'react-router-dom'
export default function Course() {
    // console.log(list);
    const [book,setBook] = useState([]);
    useEffect(() =>{
        const getBook=async()=>{
            try{
                const res= await axios.get("http://localhost:4000/book");
                console.log(res.data);
                setBook(res.data);
            } catch(error){
                console.log("Error in getting the data from :"+error);
            }
        }
        getBook();
    },[]);

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
                    book.map((item) => (
                        <Cards item={item} key={item.id}/>
                    ))
                }
            </div>
        </div>
    </>
  )
}
