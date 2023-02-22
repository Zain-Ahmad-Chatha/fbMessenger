import { Card, CardContent, Typography } from "@mui/material";

import { Stack } from "@mui/material";
import React, { forwardRef } from "react";
import "./message.css";
const Message = forwardRef(({ username, message }, ref) => {
  const isUser = username === message.username;
  return (
    <Stack ref={ref} className={`message ${isUser && "message_user"}`}>
      <Card className={isUser ? "message_userCard" : "message_guestCard"}>
        <CardContent>
          {message.message?.url ? (
            <>
              <b> {!isUser && `${message.username || "Unknown"}:`}</b>

              {message.message.url.includes(".jpg") && (
                <img
                  src={message.message.url}
                  width={"200"}
                  style={{ margin: "10px" }}
                />
              )}

              {message.message.url.includes(".mp4") && (
                <video width="320" height="240" controls>
                  <source src={message.message.url} type="video/mp4" />
                </video>
              )}

              {message.message.url.includes(".pdf") && (
                <embed
                  src={message.message.url}
                  type="application/pdf"
                  height="500px"
                  width="600"
                />
              )}
            </>
          ) : (
            <Typography variant="h5" color="black" component="h2">
              <b> {!isUser && `${message.username || "Unknown"}:`}</b>
              {message.message}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Stack>
  );
});

export default Message;
