import { useEffect, useContext } from 'react';
import SocketContext from '../../contexts/SocketContext';
import ChatBody from "../../components/ChatBody/ChatBody";
import ChatInput from "../../components/ChatInput/ChatInput";
import styles from "./chatpage.module.scss";
import { useNavigate } from "react-router-dom";

const ChatPage = () => {
  const socket = useContext(SocketContext);
  const navigate = useNavigate();

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
    if(!socket.connected)
    navigate("/")
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    // cleanup this component
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
      <div className={styles.chatpage}>
      <div className={styles.sky}></div><div className={styles.wave}></div>
      <ChatBody />
      <ChatInput />
    </div>

  );
}

export default ChatPage;
