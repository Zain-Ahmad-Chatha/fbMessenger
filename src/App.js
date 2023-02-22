import { Button, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import AttachmentIcon from "@mui/icons-material/Attachment";
import UploadIcon from "@mui/icons-material/Upload";
import { useEffect, useState } from "react";
import Message from "./Message";
import FlipMove from "react-flip-move";
// dbfile
import db from "./dbFile";
import { store } from "./dbFile";
import { addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import "./App.css";

const App = () => {
  const url =
    "https://www.thewowstyle.com/wp-content/uploads/2015/01/nature-images.jpg";
  const url2 =
    "https://cdn.bollyinside.com/articles/wp-content/uploads/sites/4/2022/06/How-to-Install-Facebook-Messenger-for-Desktop-2048x940.jpg";

  const [input, setInput] = useState("");
  const [messages, setMessage] = useState([]);
  const [username, setUserName] = useState("");

  const [imageAsFile, setImageAsFile] = useState("");
  const [percent, setPercent] = useState(0);
  useEffect(() => {
    setUserName(prompt("Enter your Name ? "));

    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let allMessages = [];
      QuerySnapshot.forEach((doc) => {
        allMessages.push({ ...doc.data(), id: doc.id });
      });
      console.log("object", allMessages);
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

  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    setImageAsFile((imageFile) => image);
  };
  const onUploadImage = () => {
    if (imageAsFile === "") {
      console.error(`not an image, the image file is a ${typeof imageAsFile}`);
      return;
    }

    const storageRef = ref(store, `/files/${imageAsFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageAsFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        ); // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
          console.log(url);
          await addDoc(collection(db, "messages"), {
            message: { url: url },
            username: username,
            createdAt: serverTimestamp(),
          });
          setPercent(0);
          setImageAsFile("");
        });
      }
    );
  };
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
        <input type="file" onChange={(e) => handleImageAsFile(e)} />
        {imageAsFile && (
          <Button onClick={() => onUploadImage()}>
            <UploadIcon />
          </Button>
        )}

        {imageAsFile && <p>{percent} "% DONE"</p>}

        <IconButton type="submit" variant="contained" disabled={!input}>
          <SendIcon />
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
