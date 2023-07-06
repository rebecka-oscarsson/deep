import { useEffect, useState, useContext, useRef } from "react";
import SocketContext from "../../SocketContext";
import UsersContext from "../../UsersContext";
import Fish from "../Fish/Fish.tsx";
import styles from "./chatbody.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";

const ChatBody = () => {const oceanRef = useRef();
  //newMessage används för att veta när pratbubblorna ska animeras
  const [newMessage, setNewMessage] = useState({});
  const socket = useContext(SocketContext);
  const { users } = useContext(UsersContext);
  const [oceanSize, setOceanSize] = useState({height: oceanRef?.current?.offsetHeight, width: oceanRef?.current?.clientWidth});

  useEffect(() => {
    window.addEventListener('resize', ()=>setOceanSize({height: oceanRef?.current?.offsetHeight, width: oceanRef?.current?.clientWidth}));
    return (() => {
      window.removeEventListener('resize', setOceanSize);
    })
  }, [])

  useEffect(() => {
    socket.on("messageToUsers", (message) => {
      setNewMessage(message);
    });
  }, [socket]);


  useEffect(() => {
    if (!oceanRef.current?.offsetHeight) {
      return;
    }
    setOceanSize({height: oceanRef?.current?.offsetHeight, width: oceanRef?.current?.clientWidth});
  }, [oceanRef?.current?.offsetHeight, oceanRef?.current?.clientWidth]);

  return (
    <main className={styles.chatbody} ref={oceanRef}>
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
      {users
        ? users.map((user) => (
            <Fish
              id={user.socketID}
              username={user.userName}
              key={user.socketID}
              movement={user.movement}
              messages={user.messages}
              newMessage={
                newMessage.socketID === user.socketID ? newMessage : null
              }
              color={user.userColor}
              position={user.position}
              avatar={user.avatar}
              widthToHeightRatio={user.widthToHeightRatio}
              oceanSize={oceanSize}
            ></Fish>
          ))
        : null}
    </main>
  );
};

export default ChatBody;
