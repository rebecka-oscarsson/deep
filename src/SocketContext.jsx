import { createContext } from "react";
import socketIO from 'socket.io-client';

const backendUrl = process.env.REACT_APP_BACKEND_URL

const socket = socketIO.connect(backendUrl);

const SocketContext = createContext();

export function SocketProvider({ children }) {
  return (
    <SocketContext.Provider value={socket}>{ children }</SocketContext.Provider>
  );
}

export default SocketContext;
