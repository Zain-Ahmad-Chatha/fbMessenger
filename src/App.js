import { Button, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import { useEffect, useState } from "react";
import Message from "./Message";
import FlipMove from "react-flip-move";
// dbfile
import db from "./dbFile";
import { addDoc, serverTimestamp } from "firebase/firestore";

import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import "./App.css";

const App = () => {
  const [input, setInput] = useState("");
  const [messages, setMessage] = useState([]);
  const [username, setUserName] = useState("");

  useEffect(() => {
    setUserName(prompt("Enter your Name ? "));

    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let allMessages = [];
      QuerySnapshot.forEach((doc) => {
        allMessages.push({ ...doc.data(), id: doc.id });
      });
      setMessage(allMessages);
    });

    return () => unsubscribe;
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!e.target.messageInput.value) return;
    const msg = e.target.messageInput.value;
    await addDoc(collection(db, "messages"), {
      message: msg,
      username: username,
      createdAt: serverTimestamp(),
    });
    setInput("");
  };
  const url =
    "https://www.thewowstyle.com/wp-content/uploads/2015/01/nature-images.jpg";
  const url2 =
    "https://cdn.bollyinside.com/articles/wp-content/uploads/sites/4/2022/06/How-to-Install-Facebook-Messenger-for-Desktop-2048x940.jpg";

  return (
    <div className="App">
      <img src={url2} width={"200"} style={{ margin: "10px" }} />
      <h1>FaceBook Messenger</h1>
      <h1>Welcome to {username} </h1>
      <form className="app_form" onSubmit={(e) => onSubmit(e)}>
        <TextField
          id="messageInput"
          name="messageInput"
          label="Enter Your Message"
          variant="standard"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="input_field"
        />

        <IconButton type="submit" variant="contained" disabled={!input}>
          <SendIcon></SendIcon>
        </IconButton>
      </form>
      {
        // messages list down
        // with diff animation
        /*
duration={750} easing="ease-out"
        */
      }
      <FlipMove>
        {!!messages &&
          messages.length > 0 &&
          messages.map((message) => (
            <Message key={message.id} message={message} username={username} />
          ))}
      </FlipMove>
    </div>
  );
};

export default App;

/*
      Database 

      rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if
          request.time < timestamp.date(2023, 3, 22);
    }
  }
}
*/
