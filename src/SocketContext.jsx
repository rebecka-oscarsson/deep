import { createContext } from "react";
import socketIO from 'socket.io-client';

const backendUrl = process.env.NODE_ENV === 'development' ? "http://localhost:4000/" : "https://chat-backend-djp6.onrender.com";

const socket = socketIO.connect(backendUrl);

const SocketContext = createContext();

export function SocketProvider({ children }) {
  return (
    <SocketContext.Provider value={socket}>{ children }</SocketContext.Provider>
  );
}

export default SocketContext;
