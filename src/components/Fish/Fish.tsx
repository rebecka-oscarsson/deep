import React from "react";
import styles from "./fish.module.scss";
import FishImage from "../FishImages/FishImage"

interface Message {
  id: string;
  text: string;
  time: string
}

type position = {
  top: Number;
  left: Number;
}

interface FishProps {
  id: string;
  username: string;
  movement: string;
  messages?: Message[];
  color: string;
  position: position
}

const Fish = ({ id, username, movement, messages, color, position }: FishProps) => {

  const style = {
    position: 'absolute',
    top: position.top + "%",
    left: position.left + "%"
  } as React.CSSProperties;

  return (
    <div style={style} >
      {messages && <div>{messages[messages.length - 1]?.text} <br />{messages[messages.length - 1]?.time}</div>}
      <div className={styles[movement]}><FishImage fill={color} id={id}/>
      </div><div className={styles.username}>{username}</div>
    </div>
  );
};

export default Fish;
