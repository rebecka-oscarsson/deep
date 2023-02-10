import { useState, useEffect } from "react";
import styles from "./bubble.module.scss";

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

interface BubbleProps {
  messages: Message[];
  newMessage: newMessage
}


const Bubble = (
  { messages, newMessage }
    : BubbleProps
) => {

  const [bubbleClass, setBubbleClass] = useState(null);
  //const [newMessageRecieved, setNewMessageRecieved] = useState(false);
  //const [firstMessage, setFirstMessage] = useState(false);

  useEffect(() => {
    if (newMessage)
    {let className = newMessage.first? styles.first : styles.new;
    setBubbleClass(className)
    setTimeout(() => {
      setBubbleClass(null)
    }, 1000)}
  }, [newMessage]);

  return (
    <div className = {`${styles.bubble} ${bubbleClass}`}>
      {messages[messages.length - 1]?.text}
      <div className={styles.timestamp}>{messages[messages.length - 1]?.formattedTime}</div>
    </div>
  )
}

export default Bubble;
