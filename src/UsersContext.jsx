import { createContext, useContext } from "react";import { formatTime } from "./services";
import SocketContext from "./SocketContext";
import { useState, useEffect } from "react";

function addFormattedTime(message) {
  if (!message.formattedTime) {
    message.formattedTime = formatTime(message.time);
  }
}

const UsersContext = createContext();

export function UsersProvider({ children }) {
  const socket = useContext(SocketContext);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    socket.on("updateUserList", (userList) => {
      userList.forEach((user) => {
        user.messages?.forEach((message) => addFormattedTime(message));
      });
      setUsers(userList);
    });
  }, [socket, users]);
  return (
    <UsersContext.Provider value={{users, setUsers}}>{children}</UsersContext.Provider>
  );
}

export default UsersContext;
