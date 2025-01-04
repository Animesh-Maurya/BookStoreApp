import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form"
import axios from "axios";
import toast from "react-hot-toast"
//we had taken the Model from dasyui for the login page here we can use react hook form
// but we are using the model instead

export default function Login() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  


  const onSubmit = async (data) => {
    const userInfo={
      email:data.email,
      password:data.password,
    };
    await axios.post("http://localhost:4000/user/login",userInfo)
    .then((res) => {
      console.log(res.data);
      if(res.data){
        toast.success("Loggedin Successfully");
      }
      localStorage.setItem("Users",JSON.stringify(res.data.user)); //here i am saving thuser to its local storage so that we can use sessions
    })
    .catch((err) => {
      if(err.response){
        console.log(err);
      
        toast.error("Error: "+err.response.data.message);
      }
    })

  }

  // this for the nevigating to the home page back
  const navigate = useNavigate();  // my model nevigation is not working then i have to use the nevigation
  const closeModalAndNavigate = () => {
    const modal = document.getElementById('my_modal_3');
    if (modal) {
      modal.close(); // Close the modal
    }
    navigate('/'); // Navigate to home
  };

  return (
    <div>
        <dialog id="my_modal_3" className="modal">
  <div className="modal-box">
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* if there is a button in form, it will close the modal */}
      <button
              type="button"
              onClick={closeModalAndNavigate}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
    
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
