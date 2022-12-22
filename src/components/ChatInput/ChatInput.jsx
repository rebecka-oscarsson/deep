import React, { useState } from 'react';
import SocketContext from '../../SocketContext';
import { useContext } from 'react';

const ChatInput = () => {
  const [message, setMessage] = useState('');
  const socket = useContext(SocketContext);

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
  return (
    <div className="">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="sendBtn">talk</button>
      </form>
    </div>
  );
};

export default ChatInput;