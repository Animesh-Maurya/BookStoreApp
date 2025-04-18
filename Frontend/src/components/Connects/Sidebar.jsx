import React, { useState } from 'react'
import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  CircularProgress,
  Tooltip,
  Drawer,
} from "@mui/material";
import toast from "react-hot-toast";
import GroupListItem  from './GroupListItem';
import { ChatState } from '../../context/ChatProvider';

function Sidebar() {

    const {selectedGroup,setSelectedGroup,group,setGroup} = ChatState();

    const [loading, setLoading] = useState(false);
    const [loadingChat,setLoadingChat] = useState(false);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    // for the Drawer constants
  const [drawerOpen,setDrawerOpen] = useState(false);
  const toggleDrawer = (newOpen) => () => {
    setDrawerOpen(newOpen);
  };

  // here is the my function for the access the groupChats
  const accessChat = async (bookId) => {
  try {
    setLoading(true);
    const headers = {
      "content-type": "application/json",
    };
    const response = await fetch("http://localhost:4000/chat/user", {
      method: "POST",
      headers,
      credentials: "include",
      body: JSON.stringify({ bookId }),
    });
    

    const data = await response.json(); // <-- add this line
    setLoading(false);
    toggleDrawer(false)(); 
    console.log("Here I am printing the group data->", data);
    if (!group.find((g) => g._id === data._id)) setGroup([data, ...group]);

    setSelectedGroup(data);

  } catch (error) {
    toast.error("Error in fetching the chat");
    console.log(error);
  }
};



  const handleSearch = async (query) =>{
    setSearch(query);
    if(!query){
        setSearchResult([]);
        return ;
    }
    console.log("Query is->",query);

    try{
        setLoading(true);
        const res = await fetch(`http://localhost:4000/chat/user/?search=${query}`, {
          method: "GET",
          credentials: "include",
        });
        console.log("data for the searched groups->", res);
        const data = await res.json();
        setSearchResult(data); 
        setLoading(false);

    }catch(error){
        console.log("Error in searching the groups->",error);
        toast.error("Error in seaching the groups");
    }
  }

    const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" open={drawerOpen}>
      <List>
        <ListItem>
          Search Groups
        </ListItem>
        <Box sx={{
          display:"flex",
          p:"2",
        }}>
          <input
              type="text"
              placeholder="Search groups by BookName"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              style={{
                backgroundColor: "white",
                color: "black",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px"
              }}
          />
        </Box>
        <Divider/>
        <Box sx={{
          py:"2",
        }}>
          {loading ? (
  <CircularProgress />
) : (
  searchResult.slice(0, 5).map(book => (
    <GroupListItem
      key={book._id}
      book={book}
      handleFunction = {()=> accessChat(book._id)}
    />
      
    
  ))
)}
           
        </Box>
      </List>
      
    </Box>
  );


  return (
    <>
        <Tooltip title="Search User" arrow>
    <Button variant="ghost" display="flex" alignItems="center" onClick={toggleDrawer(true)}>
      <i className="fas fa-search" style={{ marginRight: "8px" }}></i>
      <p>Search Groups</p>
    </Button>
  </Tooltip>
  <div>
    <Drawer open={drawerOpen} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
  </div>
    </>
  )
}

export default Sidebar