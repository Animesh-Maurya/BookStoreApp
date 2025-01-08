import React from 'react'
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthProvider';
export default function Logout() {

    const [authUser,setAuthUser] = useAuth();
    const handleLogout = () => {
        try{
            setAuthUser({
                ...authUser,
                user:null,
            })
            localStorage.removeItem("Users");
            toast.success("Logout successfully");
            window.location.reload(); //jab User LogOut ho jaye tbb website apne app relode ho jaye...
        } catch(error){
            toast.error("Error: "+error.message);
        }
    }

  return (
    <div>
        <button className='px-3 py-2 bg-red-500 text-white rounded-md cursor-pointer'
        onClick={handleLogout}>
            Logout
        </button>
    </div>
  )
}
