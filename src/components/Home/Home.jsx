import styles from "./home.module.scss";import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import SocketContext from "../../SocketContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHourglass2 } from "@fortawesome/free-regular-svg-icons";
import { userColor, randomVal, backendUrl } from "../../services";

const Home = () => {
  const savedName = localStorage.getItem("userName") || "";
  const socket = useContext(SocketContext);
  const navigate = useNavigate();
  const [userName, setUserName] = useState(savedName);
  const [connected, setConnected] = useState(socket.connected);
  const [fileToUpload, setFileToUpload] = useState(null);
  const [avatarPreview, setavatarPreview] = useState(null);
  // const [avatar, setAvatar] = useState({
  //   filename: null,
  //   widthToHeightRatio: 0.75,
  // });

  useEffect(() => {
    setConnected(socket.connected);
  }, [socket]);

  //för att man ska få en ny socket om man tryckt bakåt i browsern

  useEffect(() => {
    if (connected) {
      socket.close();
    }
    socket.connect(); // eslint-disable-next-line
  }, []);

  useEffect(() => {
    previewFile(fileToUpload);
  }, [fileToUpload]);

  socket.on("connect", function () {
    setConnected(socket.connected);
  });

  function previewFile(selectedFile) {
    // Reading New File (open file Picker Box)
    const reader = new FileReader();
    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
    // As the File loaded then set the stage as per the file type
    reader.onload = (readerEvent) => {
      setavatarPreview(readerEvent.target.result);
    };
  }

  //tänker det här ska bli post till en databas senare
  async function postImage(file) {
    const formData = new FormData();
    formData.append("avatar", file, file.name);
    const response = await fetch(backendUrl + "avatars/upload", {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }
    const avatarData = await response.json();
    return avatarData;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.setItem("userName", userName);
    let defaultAvatarData = {
      filename: null,
      widthToHeightRatio: 0.72,
    };
    let avatarData = fileToUpload
      ? await postImage(fileToUpload)
      : defaultAvatarData;
    socket.emit("newUser", {
      userName,
      socketID: socket.id,
      userColor: userColor,
      position: { top: randomVal(0, 70), left: randomVal(0, 93) },
      messages: [],
      avatar: avatarData.filename,
      widthToHeightRatio: avatarData.widthToHeightRatio,
    });
    navigate("/talk");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.loginform}>
      <h2>Welcome to the chat</h2>
      <div>
        <label htmlFor="username">username</label>
        <input
          type="text"
          minLength={2}
          name="username"
          id="username"
          className=""
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />

        <div className={styles.image_picker}>
          <div>
            <label htmlFor="avatar">upload avatar (optional)</label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              accept="image/*"
              onChange={(e) => setFileToUpload(e.target.files[0])}
            />
          </div>
          {fileToUpload && (
            <img
              src={avatarPreview}
              className={styles.image_preview}
              height="80px"
              width="auto"
              alt=""
            />
          )}
        </div>
      </div>
      {connected ? (
        <>
          <input type="submit" value="enter" className="primary-btn" />
          <div>
            Nobody there? Log in to another browser tab and talk to yourself
          </div>
        </>
      ) : (
        <FontAwesomeIcon
          icon={faHourglass2}
          className={styles.hourglass_icon}
        />
      )}
    </form>
  );
};

export default Home;
