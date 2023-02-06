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

interface newMessage {
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
}



const Fish = ({
  id,
  username,
  movement,
  messages,
  newMessage,
  color,
  position,
}: FishProps) => {
  const style = {
    position: "absolute",
    top: position.top + "%",
    left: position.left + "%",
  } as React.CSSProperties;

function darkenColor()
{let splitColor =  color.split(',');
let lightness = splitColor[2]
let lightnessNumber = parseInt(lightness.slice(0,lightness.length-2));
const darkerNumber = Math.round(lightnessNumber*0.5);
let darkColor = `${splitColor[0]},${splitColor[1]}, ${String(darkerNumber)}%)`
return darkColor}

  return (
    <div style={style} className={styles.container}>
      {messages && messages.length ?
        <Bubble messages={messages} newMessage={newMessage}/> : null
      }
      <div className={styles[movement]} title={username}>
        <FishImage fill={color} darkColor={darkenColor()} id={id} />
      </div>
    </div>
  );
};

export default Fish;
