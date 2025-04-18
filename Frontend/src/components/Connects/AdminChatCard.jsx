// src/components/AdminChat/AdminChatCard.jsx
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Box,
  Modal,
  Stack,
  IconButton,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 360,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
  outline: "none",
};

export default function AdminChatCard({ chat, onAccept, onRemove}) {
  const [openPendings, setOpenPendings] = useState(false);
  const [openUsers, setOpenUsers] = useState(false);


  return (
    <>
      <Card variant="outlined" sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6">{chat.book.name}</Typography>
          <Typography color="text.secondary" sx={{ fontSize: 14 }}>
            {chat.book.category}
          </Typography>
        </CardContent>

        <CardActions sx={{ justifyContent: "space-between" }}>
          <Button onClick={() => setOpenPendings(true)}>
            Pendings ({chat.pendingUsers.length})
          </Button>
          <Button onClick={() => setOpenUsers(true)}>
            Users ({chat.users.length})
          </Button>
        </CardActions>
      </Card>

      {/* Pendings Modal */}
      <Modal
        open={openPendings}
        onClose={() => setOpenPendings(false)}
        aria-labelledby="pendings-modal-title"
      >
        <Box sx={modalStyle}>
          <Typography id="pendings-modal-title" variant="h6" gutterBottom>
            Pending Users
          </Typography>

          {chat.pendingUsers.length === 0 ? (
            <Typography>No pending users.</Typography>
          ) : (
            <Stack spacing={2}>
              {chat.pendingUsers.map((u) => (
                <Box
                  key={u._id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    p: 1,
                    borderRadius: "4px",
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  <Box>
                    <Typography variant="body1">{u.fullname}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {u.email}
                    </Typography>
                  </Box>
                  <Button
                    size="small"
                    variant="contained"
                    color="success"
                    startIcon={<CheckIcon />}
                    onClick={() => onAccept(u, chat._id)}
                  >
                    Accept
                  </Button>
                </Box>
              ))}
            </Stack>
          )}
        </Box>
      </Modal>

      {/* Users Modal */}
      <Modal
        open={openUsers}
        onClose={() => setOpenUsers(false)}
        aria-labelledby="users-modal-title"
      >
        <Box sx={modalStyle}>
          <Typography id="users-modal-title" variant="h6" gutterBottom>
            Group Users
          </Typography>

          {chat.users.length === 0 ? (
            <Typography>No users in this group.</Typography>
          ) : (
            <Stack spacing={2}>
              {chat.users.map((u) => (
                <Box
                  key={u._id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    p: 1,
                    borderRadius: "4px",
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  <Box>
                    <Typography variant="body1">
                      {u.fullname}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {u.email}
                    </Typography>
                  </Box>
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => onRemove(u, chat._id)}
                  >
                    Remove
                  </Button>
                </Box>
              ))}
            </Stack>
          )}
        </Box>
      </Modal>
    </>
  );
}
