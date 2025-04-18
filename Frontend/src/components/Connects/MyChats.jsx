import React, { useEffect, useMemo } from "react";
import { ChatState } from "../../context/ChatProvider";
import { useAuth } from "../../context/AuthProvider";
import {
  Box,
  Divider,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";
import toast from "react-hot-toast";

function MyChats({fetchAgain}) {
  const [authUser] = useAuth();
  const userId = authUser?._id;

  const {
    selectedGroup,
    setSelectedGroup,
    group,
    setGroup,
  } = ChatState();

  // Load chats from server
  const fetchChats = async () => {
    try {
      const res = await fetch(
        "http://localhost:4000/chat/user/fetch",
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!res.ok) {
        throw new Error(`Server responded ${res.status}`);
      }
      const data = await res.json();
      setGroup(data);
    } catch (err) {
      console.error("Error loading chats:", err);
      toast.error("Error in loading the chats");
    }
  };

  useEffect(() => {
    fetchChats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchAgain]);

  // Partition into joined vs pending
  const joinedGroups = useMemo(
    () =>
      group.filter((chat) =>
        chat.users.some((u) => u._id === userId)
      ),
    [group, userId]
  );

  const pendingGroups = useMemo(
    () =>
      group.filter((chat) =>
        chat.pendingUsers.some((u) => u._id === userId)
      ),
    [group, userId]
  );

  return (
    <Box
      sx={{
        display: { xs: selectedGroup ? "none" : "flex", md: "flex" },
        flexDirection: "column",
        alignItems: "center",
        p: 2,
        backgroundColor: "white",
        width: { xs: "100%", md: "31%" },
        borderRadius: "1rem",
        border: "1px solid black",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          fontSize: { xs: 22, md: 24 },
          fontFamily: "Work Sans",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6"
        sx={{
            color:"black"
        }}>My Groups</Typography>
      </Box>

      {/* Chats Container */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          p: 2,
          backgroundColor: "#F8F8F8",
          width: "100%",
          flex: 1,
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        {/* Joined */}
        <Typography variant="subtitle2" sx={{ mb: 1,
            color:"black",
         }}>
          Joined Groups
        </Typography>
        <Box sx={{ flex: 1, overflowY: "auto" }}>
          {group.length === 0 ? (
            <Box
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress />
            </Box>
          ) : joinedGroups.length > 0 ? (
            <Stack spacing={1}>
              {joinedGroups.map((chat) => (
                <Box
                  key={chat._id}
                  onClick={() => setSelectedGroup(chat)}
                  sx={{
                    cursor: "pointer",
                    backgroundColor:
                      selectedGroup?._id === chat._id
                        ? "#38BA2C"
                        : "#E8E8E8",
                    color:
                      selectedGroup?._id === chat._id
                        ? "white"
                        : "black",
                    p: 2,
                    borderRadius: "8px",
                  }}
                >
                  <Typography noWrap>{chat.book.name}</Typography>
                </Box>
              ))}
            </Stack>
          ) : (
            <Typography color="text.secondary">
              No joined groups
            </Typography>
          )}
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Pending */}
        <Typography variant="subtitle2" sx={{ mb: 1,
            color:"black"
         }}>
          Pending Groups
        </Typography>
        <Box sx={{ flex: 1, overflowY: "auto" }}>
          {pendingGroups.length > 0 ? (
            <Stack spacing={1}>
              {pendingGroups.map((chat) => (
                <Box
                  key={chat._id}
                  onClick={() => setSelectedGroup(chat)}
                  sx={{
                    cursor: "pointer",
                    backgroundColor:
                      selectedGroup?._id === chat._id
                        ? "#38BA2C"
                        : "#E8E8E8",
                    color:
                      selectedGroup?._id === chat._id
                        ? "white"
                        : "black",
                    p: 2,
                    borderRadius: "8px",
                  }}
                >
                  <Typography noWrap>{chat.book.name}</Typography>
                </Box>
              ))}
            </Stack>
          ) : (
            <Typography color="text.secondary">
              No pending groups
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default MyChats;
