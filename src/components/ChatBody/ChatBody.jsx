import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import SocketContext from '../../SocketContext';
import Fish from "../Fish/Fish.tsx";

const ChatBody = () => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const socket = useContext(SocketContext)
  const navigate = useNavigate();

  useEffect(() => {
    socket.on('updateUserList', (data) => setUsers(data));
  }, [socket, users]);

  const handleLeaveChat = () => {
    localStorage.removeItem('userName');
    navigate('/');
    window.location.reload();
  };

  useEffect(() => {
    socket.on('messageToUsers', (data) => setMessages([...messages, data]));
  }, [socket, messages]);

  return (
    <>
        <button className="leaveChat__btn" onClick={handleLeaveChat}>
          LEAVE CHAT
        </button>
      {users.map((user) => (
            <Fish id={user.socketID} username={user.userName} key={user.socketID} messages={messages.filter((message) => message.socketID === user.socketID)} color={user.userColor}></Fish>
          ))}
    </>
  );
};

export default ChatBody;
