import { createContext } from "react";
import socketIO from 'socket.io-client';
import { backendUrl } from "./services"

const socket = socketIO.connect(backendUrl);

const SocketContext = createContext();

export function SocketProvider({ children }) {
  return (
    <SocketContext.Provider value={socket}>{ children }</SocketContext.Provider>
  );
}

export default SocketContext;
