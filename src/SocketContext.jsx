import { createContext } from "react";
import socketIO from 'socket.io-client';

const socket = socketIO.connect('http://localhost:4000');

const SocketContext = createContext();

export function SocketProvider({ children }) {
  return (
    <SocketContext.Provider value={socket}>{ children }</SocketContext.Provider>
  );
}

export default SocketContext;
