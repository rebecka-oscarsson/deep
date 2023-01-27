import React from "react";
import styles from "./fish.module.scss";
import FishImage from "../FishImages/FishImage";
import Bubble from "../Bubble/Bubble";

interface Message {
  id: string;
  text: string;
  time: string;
  formattedTime: string;
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
  color: string;
  position: position;
}

const Fish = ({
  id,
  username,
  movement,
  messages,
  color,
  position,
}: FishProps) => {
  const style = {
    position: "absolute",
    top: position.top + "%",
    left: position.left + "%",
  } as React.CSSProperties;

  return (
    <div style={style} className={styles.container}>
      {messages && messages.length?
       <Bubble messages={messages} /> : null
      }
      <div className={styles[movement]} title={username}>
        <FishImage fill={color} id={id} />
      </div>
    </div>
  );
};

export default Fish;
