import styles from "./home.module.scss";
import { useState, useEffect, useContext } from "react";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userName", userName);

    socket.emit("newUser", {
      userName,
      socketID: socket.id,
      userColor: userColor,
      position: { top: randomVal(0, 70), left: randomVal(0, 93) },
      messages: [],
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
