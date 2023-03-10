import { useEffect, useState, useContext } from "react";

import SocketContext from "../../SocketContext";
import UsersContext from "../../UsersContext";
import Fish from "../Fish/Fish.tsx";
import styles from "./chatbody.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";

const ChatBody = () => {
  const [newMessage, setNewMessage] = useState({});
  const socket = useContext(SocketContext);
  const users = useContext(UsersContext);

  useEffect(() => {
    socket.on("messageToUsers", (message) => {
      setNewMessage(message);
    });
  }, [socket]);


  return (
    <main className={styles.chatbody}>
      <details className={styles.question}>
        <summary>
          <FontAwesomeIcon
            icon={faQuestionCircle}
            className={styles.question_icon}
          />
        </summary>
        <div>Move using the arrow keys</div>
        <div>Hover over others to see their names</div>
      </details>
      {users? users.map((user) => (
        <Fish
          id={user.socketID}
          username={user.userName}
          key={user.socketID}
          movement={user.movement}
          messages={user.messages}
          newMessage={newMessage.socketID === user.socketID ? newMessage : null}
          color={user.userColor}
          position={user.position}
        ></Fish> 
      )): null}
      <svg width="0" height="0">
        {/*this svg is not visible but its paths are used to clip in css*/}
        <defs>
          <clipPath id="desktop" clipPathUnits="objectBoundingBox">
            <path d="M 0,0 3.972864e-4,0.91065274 C 0.33151178,1.1046347 0.43093849,0.9209222 1,0.93019465 L 1,0 Z" />
          </clipPath>
          <clipPath id="tablet" clipPathUnits="objectBoundingBox">
            <path d="m 0,0 v 0.96875 c 0,0 0.17515677,0.0509972 0.47851563,0.0214844 0.41273384,-0.0252287 0.52929687,0 0.52929687,0 L 1,0 Z" />
          </clipPath>
        </defs>
      </svg>
    </main>
  );
};

export default ChatBody;
