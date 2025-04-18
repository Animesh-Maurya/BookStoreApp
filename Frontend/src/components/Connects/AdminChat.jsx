// src/components/AdminChat/AdminChat.jsx
import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import toast from "react-hot-toast";
import AdminChatCard from "./AdminChatCard";
import { User } from "../../../../Backend/model/user.model";

export default function AdminChat() {
  const [adminChats, setAdminChats] = useState([]);
  const [loading, setLoading] = useState(true);

  // here is my onAccept function

  const onAccept = async (user, chatId) => {
    try {
      const res = await fetch("http://localhost:4000/chat/admin/addToGroup", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id, chatId }),
      });
      const result = await res.json();
    //   if (!res.ok) throw new Error(result.message || "Failed to accept user");

      // result.data is the updated chat
      setAdminChats((prev) =>
        prev.map((c) => (c._id === chatId ? result : c))
      );

      toast.success("User accepted into group");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Error accepting user");
    }
  };

  // here is my onreject function

  const onRemove = async (user, chatId) => {
    try {
      const res = await fetch("http://localhost:4000/chat/admin/removeFromGroup", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id, chatId }),
      });
      const result = await res.json();
    //   if (!res.ok) throw new Error(result.message || "Failed to accept user");

      // result.data is the updated chat
      setAdminChats((prev) =>
        prev.map((c) => (c._id === chatId ? result : c))
      );

      toast.success("User is removed from group");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Error accepting user");
    }
  }

  useEffect(() => {
    const getChats = async () => {
      try {
        const res = await fetch("http://localhost:4000/chat/admin", {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
          throw new Error(`Server returned ${res.status}`);
        }
        const result = await res.json();
        // expecting { success, message, data: [ ...chats ] }
       console.log(result);
        setAdminChats(result);
         
      } catch (err) {
        console.error("Error fetching admin chats:", err);
        toast.error("Error fetching admin chats");
      } finally {
        setLoading(false);
      }
    };

    getChats();
  }, []);

  return (
    <Box p={2}>
      <Typography variant="h5" gutterBottom>
        Admin Groups
      </Typography>

      {loading ? (
        <Box
          sx={{
            height: "60vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : adminChats.length === 0 ? (
        <Typography>No admin groups found.</Typography>
      ) : (
        adminChats.map((chat) => (
          <AdminChatCard key={chat._id} chat={chat} onAccept={onAccept} onRemove={onRemove}  />
        ))
      )}
    </Box>
  );
}
