import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Navbar from '../Navbar'
import { useAuth } from '../../context/AuthProvider'
import AdminChat from './AdminChat'
import { Box } from "@mui/material"
import MyChats from './MyChats'
function Connect() {

  const [authUser, setAuthUser] = useAuth();
  const [fetchAgain, setFetchAgain] = useState(false);

  const role = authUser?.role;
  console.log("Printing the role of the user->",role);
  return (
    <>
      <Navbar />
      <div style={{ marginTop: '70px' }}>
         { role === "admin" ? <AdminChat /> : <Sidebar/>}
      <Box display="flex"
        justifyContent="space-between"
        w="100%"
        h="91.5vh"
        p="10px">
          { role === "user" && <MyChats fetchAgain={fetchAgain}/>}
        </Box>
        
      </div>
    </>
  )
}

export default Connect