import { useState } from 'react';
import SocketContext from '../../SocketContext';
import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import styles from "./chatinput.module.scss";

const ChatInput = () => {
  const [message, setMessage] = useState('');
  const socket = useContext(SocketContext);
  const navigate = useNavigate();

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && localStorage.getItem('userName')) {
      socket.emit('messageFromUser', {
        text: message,
        name: localStorage.getItem('userName'),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    }
    setMessage('');
  };

  const handleLeaveChat = () => {
    socket.close();
    localStorage.removeItem("userName");
    navigate("/");
  };

  return (
    <div className={styles.chatinput} >
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"    
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength="100"
          className={styles.inputfield}
        />
        <button className="primary-btn" type="submit">talk</button>
        </form>
        <button className="secondary-btn" onClick={handleLeaveChat}>
        leave
      </button>
      </div>
  );
};

export default ChatInput;