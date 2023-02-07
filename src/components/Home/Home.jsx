import styles from "./home.module.scss";

import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SocketContext from "../../SocketContext";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userName, setUserName] = useState("");

  function randomVal(min, max) {
    //ger slumpsiffror till färggenerering
    return Math.floor(Math.random() * (max - min) + 1) + min;
  }

  const userColor =
    "hsl(" +
    randomVal(0, 360) +
    ", " +
    randomVal(60, 80) +
    "%, " +
    randomVal(70, 90) +
    "%)";
  //hue mellan 0-360, saturation 0-100, lightness 0-100
  
  const socket = useContext(SocketContext);

  const switchSocket = () => {
    {socket.close();
    localStorage.removeItem("userName");
    socket.open();
  }
  };

  //gör att socket stängs och öppnas igen om man backat i browsern
  useEffect(() => {
    switchSocket();
  }, [location]);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userName", userName);
    socket.emit("newUser", {
      userName,
      socketID: socket.id,
      userColor: userColor,
      position: { top: randomVal(0, 70), left: randomVal(0, 93) },
      messages: []
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
      <input type="submit" value="enter" className="primary-btn" />
    </form>
  );
};

export default Home;
