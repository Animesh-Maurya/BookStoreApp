import React from 'react';
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";

function GroupListItem({book,handleFunction}) {
  return (
    <>
    <Box
    onClick={handleFunction}
  sx={{
    backgroundColor: "#E8E8E8",
    "&:hover": {
      backgroundColor: "#38B2AC",
      color: "white",
    },
    width: "100%", 
    display: "flex",
    alignItems: "center",
    gap: "8px", // Creates a small gap between Avatar and text
    padding: "8px 12px", // Slimmer padding
    mb: 2,
    borderRadius: "8px", // Rounded corners
    cursor: "pointer",
  }}
>
        <Box>
    <Typography variant="h6" color="black">
      {book.name}
    </Typography>
    <Typography variant="body2" color="black">
      Title: {book.title}
    </Typography>
  </Box>
</Box>
    </>
  )
}

export default GroupListItem