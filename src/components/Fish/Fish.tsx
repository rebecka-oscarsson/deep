import React from "react";
//import styles from "./fish.module.scss";
import FishImage from "../FishImages/FishImage"

interface Message {
  id: string;
  text: string;
}

interface FishProps {
  id: string;
  username: string;
  messages?: Message[];
  color: string;
}



const Fish = ({ id, username, messages, color }: FishProps) => {
  return (
    <div>
      <FishImage fill={color} stroke='black'/>
      <div>{username}</div>
      {messages && <div>{messages[messages.length - 1]?.text}</div>}
    </div>
  );
};

export default Fish;
