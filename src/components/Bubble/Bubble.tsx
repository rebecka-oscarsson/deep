import { useState, useEffect, useRef } from "react";
import styles from "./bubble.module.scss";
import { Message, newMessage } from "../Fish/Fish"

interface BubbleProps {
  messages: Message[];
  newMessage: newMessage
  updateBubbleDimensions: Function
  style: React.CSSProperties
}

const Bubble = (
  { messages, newMessage, updateBubbleDimensions, style }
    : BubbleProps
) => {

  const [bubbleClass, setBubbleClass] = useState(null);
  const bubbleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (newMessage) {
      let newMessageClass = newMessage.first ? styles.first : styles.new;
      setBubbleClass(newMessageClass);
      setTimeout(() => {
        setBubbleClass(styles.old)
      }, 1000)
    }
  }, [newMessage]);

  useEffect(() => {
    if (!bubbleRef.current?.offsetHeight) {
      return;
    }
    updateBubbleDimensions({height: bubbleRef?.current.offsetHeight, width: bubbleRef?.current?.offsetWidth});
  }, [bubbleRef?.current?.offsetHeight, bubbleRef?.current?.offsetWidth]);

  return (
    <div className={`${styles.bubble} ${bubbleClass}`} ref={bubbleRef} style={style} title={messages[messages.length - 1]?.formattedTime}>
      {messages[messages.length - 1]?.text}
      {/* <div className={styles.timestamp}>{messages[messages.length - 1]?.formattedTime}</div> */}
    </div>
  )
}

export default Bubble;
