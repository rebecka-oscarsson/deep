import { useState, useContext } from "react";import SocketContext from "../../contexts/SocketContext";
import UsersContext from "../../contexts/UsersContext";
import { useNavigate } from "react-router-dom";
import styles from "./chatinput.module.scss";

const ChatInput = () => {
  const [message, setMessage] = useState("");
  const socket = useContext(SocketContext);
  const { setUsers } = useContext(UsersContext);
  const navigate = useNavigate();

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && localStorage.getItem("userName")) {
      socket.emit("messageFromUser", {
        text: message,
        name: localStorage.getItem("userName"),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    }
    setMessage("");
  };

  const handleLeaveChat = () => {
    socket.close();
    setUsers(null);
    navigate("/");
  };

  return (
    <div className={styles.container}>
    <div className={styles.sandwave}></div>
    <div className={styles.chatinput}>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength="100"
          className={styles.inputfield}
        />
        <button className="primary-btn" type="submit">
          talk
        </button>
      </form>
      <button className="secondary-btn" onClick={handleLeaveChat}>
        leave
      </button>

      {/* <svg
        id="wave"
        width="0" height="0"
        //style="transform:rotate(180deg); transition: 0.3s"
        viewBox="0 0 1440 100"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath id="bottom">
            <path 
              d="M0,80L13.3,81.7C26.7,83,53,87,80,81.7C106.7,77,133,63,160,48.3C186.7,33,213,17,240,16.7C266.7,17,293,33,320,48.3C346.7,63,373,77,400,80C426.7,83,453,77,480,76.7C506.7,77,533,83,560,71.7C586.7,60,613,30,640,30C666.7,30,693,60,720,68.3C746.7,77,773,63,800,56.7C826.7,50,853,50,880,56.7C906.7,63,933,77,960,68.3C986.7,60,1013,30,1040,21.7C1066.7,13,1093,27,1120,41.7C1146.7,57,1173,73,1200,71.7C1226.7,70,1253,50,1280,43.3C1306.7,37,1333,43,1360,45C1386.7,47,1413,43,1440,50C1466.7,57,1493,73,1520,73.3C1546.7,73,1573,57,1600,53.3C1626.7,50,1653,60,1680,55C1706.7,50,1733,30,1760,26.7C1786.7,23,1813,37,1840,41.7C1866.7,47,1893,43,1907,41.7L1920,40L1920,100L1906.7,100C1893.3,100,1867,100,1840,100C1813.3,100,1787,100,1760,100C1733.3,100,1707,100,1680,100C1653.3,100,1627,100,1600,100C1573.3,100,1547,100,1520,100C1493.3,100,1467,100,1440,100C1413.3,100,1387,100,1360,100C1333.3,100,1307,100,1280,100C1253.3,100,1227,100,1200,100C1173.3,100,1147,100,1120,100C1093.3,100,1067,100,1040,100C1013.3,100,987,100,960,100C933.3,100,907,100,880,100C853.3,100,827,100,800,100C773.3,100,747,100,720,100C693.3,100,667,100,640,100C613.3,100,587,100,560,100C533.3,100,507,100,480,100C453.3,100,427,100,400,100C373.3,100,347,100,320,100C293.3,100,267,100,240,100C213.3,100,187,100,160,100C133.3,100,107,100,80,100C53.3,100,27,100,13,100L0,100Z"
            />
          </clipPath>
        </defs>
      </svg> */}
    </div>
    </div>
  );
};

export default ChatInput;
