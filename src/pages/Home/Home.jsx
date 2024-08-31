import styles from "./home.module.scss";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import SocketContext from "../../contexts/SocketContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHourglass2 } from "@fortawesome/free-regular-svg-icons";
import ImageUploader from "../../components/ImageUploader/ImageUploader";
import { userColor, randomVal, backendUrl } from "../../services";

const Home = () => {
  const savedName = localStorage.getItem("userName") || "";
  const socket = useContext(SocketContext);
  const navigate = useNavigate();
  const [userName, setUserName] = useState(savedName);
  const [connected, setConnected] = useState(socket.connected);
  const [fileToUpload, setFileToUpload] = useState(null);
  //const [avatarPreview, setavatarPreview] = useState(null);

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


  socket.on("connect", function () {
    setConnected(socket.connected);
  });

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
    //defaultAvatar är maneten
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
      <div className={styles.formfields}>
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
        </div>
        <ImageUploader
          fileToUpload={fileToUpload}
          setFileToUpload={setFileToUpload}
        />
      {connected ? (
        <>
          <input type="submit" value="enter" className="primary-btn" />
          <div>
            <p>The server can be slow, don't give up</p>
            <p>Enjoy talking to yourself? Log in to two browser tabs</p>
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
