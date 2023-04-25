import React from "react";
import styles from "./fish.module.scss";
import FishImage from "../FishImages/FishImage";
import Bubble from "../Bubble/Bubble";
import { darkenColor } from "../../services"

export interface Message {
  id: string;
  text: string;
  time: string;
  formattedTime: string;
}

export interface newMessage {
  id: string;
  first: boolean;
}

type position = {
  top: Number;
  left: Number;
};

interface FishProps {
  id: string;
  username: string;
  movement: string;
  messages?: Message[];
  newMessage: newMessage;
  color: string;
  darkColor: string;
  position: position;
  avatar?: object
}

const Fish = ({
  id,
  username,
  movement,
  messages,
  newMessage,
  color,
  position,
  avatar
}: FishProps) => {
  const style = {
    position: "absolute",
    top: position.top + "%",
    left: position.left + "%",
  } as React.CSSProperties;

  return (
    <div style={style} className={styles.container}>
      {messages && messages.length > 0 ?
        <Bubble messages={messages} newMessage={newMessage} /> : null
      }
      <div className={styles[movement]} title={username}>
        <FishImage fill={color} darkColor={darkenColor(color)} id={id} />
      </div>
    </div>
  );
};

export default Fish;
