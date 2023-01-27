import { useEffect } from "react";
import styles from "./bubble.module.scss";

interface Message {
  id: string;
  text: string;
  time: string;
  formattedTime: string;
}

interface BubbleProps {
  messages: Message[];
}


const Bubble = (
  {messages}
: BubbleProps
) => {
  useEffect(() => {
    console.log("meddelande");
  }, [messages]);


  return (
    <div className={styles.bubble}>
      {messages[messages.length - 1]?.text} <br />
      <div className={styles.timestamp}>{messages[messages.length - 1]?.formattedTime} </div>
    </div>
  )
}

export default Bubble;
