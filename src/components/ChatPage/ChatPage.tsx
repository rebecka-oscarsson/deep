import { useEffect, useContext } from 'react';
import SocketContext from '../../SocketContext';
import ChatBody from "../ChatBody/ChatBody";
import ChatInput from "../ChatInput/ChatInput";
import styles from "./chatpage.module.scss";
import { useNavigate } from "react-router-dom";

const ChatPage = () => {
  const socket = useContext(SocketContext);
  const navigate = useNavigate();

  const handleLeaveChat = () => {
    socket.close();
    localStorage.removeItem("userName");
    navigate("/");
    window.location.reload();
  };

  const handleKeyDown = (event: { key: string; }) => {
    if (event.key.includes("Arrow"))
    socket.emit('move', {
      pressed: event.key,
      socketID: socket.id,
    });
  };

  const handleKeyUp = (event: { key: string; }) => {
    if (event.key.includes("Arrow"))
    socket.emit('stop', {
      socketID: socket.id,
    });
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('beforeunload', handleLeaveChat);
    // cleanup this component
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('beforeunload', handleLeaveChat)
    };
  }, []);

  return (
    <div className={styles.chatpage}>
      <ChatBody />
      <ChatInput />
    </div>
  );
}

export default ChatPage;
