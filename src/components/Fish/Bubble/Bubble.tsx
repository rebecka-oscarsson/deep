import { useState, useEffect, useRef } from "react";
import { Message, newMessage } from "../Fish"
import styles from "./bubble.module.scss";

interface Props {
  messages: Message[];
  newMessage: newMessage
  updateBubbleDimensions: Function
  style: React.CSSProperties
}

export function Bubble(props: Props) {

  const {
    messages,
    newMessage,
    updateBubbleDimensions,
    style
  } = props

  const [bubbleClass, setBubbleClass] = useState(messages?.length > 0 ? null : styles.hidden);

  const bubbleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (newMessage) {
      let animatedBubble = newMessage.first ? styles.first : styles.new;
      setBubbleClass(animatedBubble);
      setTimeout(() => {
        setBubbleClass(null)
      }, 1000)
    }
  }, [newMessage]);

  useEffect(() => {
    if (!bubbleRef?.current?.offsetHeight) {
      return;
    }
    const margin = parseInt(window.getComputedStyle(bubbleRef.current).getPropertyValue("margin-bottom"));
    updateBubbleDimensions({ height: bubbleRef?.current?.offsetHeight + margin, width: bubbleRef?.current?.offsetWidth });
  }, [bubbleRef?.current?.offsetHeight, bubbleRef?.current?.offsetWidth]);

  return (
    <div className={`${styles.bubble} ${bubbleClass}`} ref={bubbleRef} style={style} title={messages[messages.length - 1]?.formattedTime}>
      {messages[messages.length - 1]?.text}
      {/* <div className={styles.timestamp}>{messages[messages.length - 1]?.formattedTime}</div> */}
    </div>
  )
}
