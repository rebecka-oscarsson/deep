import React, { useEffect, useState, useContext } from "react";

import SocketContext from "../../SocketContext";
import Fish from "../Fish/Fish.tsx";
import { formatTime } from '../../services';
import styles from "./chatbody.module.scss";

const ChatBody = () => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const socket = useContext(SocketContext);
  

  useEffect(() => {
    socket.on("updateUserList", (data) => setUsers(data));
  }, [socket, users]);



  useEffect(() => {
    socket.on("messageToUsers", (data) => {console.log(data); data.map((message)=> (message.time= formatTime(message.time))); setMessages(data)});
  }, [socket, messages]);
  //varför behöver jag en useeffect? För när en ny användare loggar in?

  return (
    <main className={styles.chatbody}>
      
      {users.map((user) => (
        <Fish
          id={user.socketID}
          username={user.userName}
          key={user.socketID}
          movement={user.movement}
          messages={messages.filter(
            (message) => message.socketID === user.socketID
          )}
          color={user.userColor}
          position={user.position}
        ></Fish>
      ))}
            <svg width="0" height="0">
             
                {/*this svg is not visible but its paths are used to clip in css*/}
                <defs>
                    <clipPath id="desktop" clipPathUnits="objectBoundingBox">
                        <path d="M 0,0 3.972864e-4,0.91065274 C 0.33151178,1.1046347 0.43093849,0.9209222 1,0.93019465 L 1,0 Z" />
                    </clipPath>
                    <clipPath
                        id="tablet"
                        clipPathUnits="objectBoundingBox"
                    >
                        <path d="m 0,0 v 0.96875 c 0,0 0.17515677,0.0509972 0.47851563,0.0214844 0.41273384,-0.0252287 0.52929687,0 0.52929687,0 L 1,0 Z" />
                    </clipPath>
                </defs>
            </svg>
    </main>
  );
};

export default ChatBody;
