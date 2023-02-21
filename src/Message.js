import { Card, CardContent, Typography } from "@mui/material";

// import Stack from '@mui/material/Stack';
// or
import { Stack } from "@mui/material";
import React, { forwardRef } from "react";
import "./message.css";
const Message = forwardRef(({ username, message }, ref) => {
  const isUser = username === message.username;
  return (
    <Stack ref={ref} className={`message ${isUser && "message_user"}`}>
      <Card className={isUser ? "message_userCard" : "message_guestCard"}>
        <CardContent>
          <Typography variant="h5" color="black" component="h2">
            <b> {!isUser && `${message.username || "Unknown"}:`}</b>
            {message.message}
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  );
});

export default Message;
