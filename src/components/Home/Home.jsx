import styles from "./home.module.scss";import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import SocketContext from "../../SocketContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHourglass2 } from "@fortawesome/free-regular-svg-icons";
import { userColor, randomVal } from "../../services";

const Home = () => {
  const savedName = localStorage.getItem("userName") || "";
  const socket = useContext(SocketContext);
  const navigate = useNavigate();
  const [userName, setUserName] = useState(savedName);
  const [connected, setConnected] = useState(socket.connected);
  const [avatar, setAvatar] = useState(null);
  //flytta och exportera från lämplig fil men vilken?
  const backendUrl = process.env.NODE_ENV === 'development' ? "http://localhost:4000/" : "https://chat-backend-djp6.onrender.com";

  useEffect(() => {
    setConnected(socket.connected);
  }, [socket]);

  //för att man ska få en ny socket om man tryckt bakåt i browsern
  useEffect(() => {
    if (connected) {
      socket.close();
    }
    socket.connect();
  }, []);

  socket.on("connect", function () {
    setConnected(socket.connected);
  });

  //tänker det här ska bli post till en databas senare
  function postImage(payload) {
    fetch(backendUrl, {    
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
        .catch(function(err) {
            {console.log('Något gick fel', err)};
        });
}

  const handleSubmit = (e) => {
    e.preventDefault();
    postImage({"filename": avatar})
    localStorage.setItem("userName", userName);
    socket.emit("newUser", {
      userName,
      socketID: socket.id,
      userColor: userColor,
      position: { top: randomVal(0, 70), left: randomVal(0, 93) },
      messages: [],
      avatar: avatar
    });
    navigate("/talk");
  };

  return (
    <form className={styles.loginform} onSubmit={handleSubmit}>
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
        <label htmlFor="avatar">upload avatar (optional)</label>
        <input
          type="file"
          id="avatar"
          name="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0].name)}
        />
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
