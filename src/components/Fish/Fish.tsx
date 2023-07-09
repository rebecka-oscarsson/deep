import { useEffect, useState } from "react";
import FishImage from "./Avatars/FishImage";
import UserImage from "./Avatars/UserImage"
import { Bubble } from "./Bubble/Bubble";
import { darkenColor, backendUrl } from "../../services";
import variables from "../../variables.module.scss";
import styles from "./fish.module.scss";

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

type dimensions = {
  height: number;
  width: number;
}

type position = {
  top: number;
  left: number;
};

interface Props {
  id: string;
  username: string;
  movement: string;
  messages: Message[];
  newMessage: newMessage;
  color: string;
  darkColor: string;
  position: position;
  avatar?: string;
  widthToHeightRatio: number,
  oceanSize: dimensions
}

export function Fish(props: Props) {

  // destructured data from props
  const {
    id,
    username,
    movement,
    messages,
    newMessage,
    color,
    position,
    avatar,
    widthToHeightRatio,
    oceanSize
  } = props

  // local state
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  const [bubbleDimensionsInPercent, setBubbleDimensionsInPercent] = useState({ height: 0, width: 0 });
  const [userPosition, setUserPosition] = useState(calculateUserPosition(position, widthToHeightRatio, oceanSize, screenSize, bubbleDimensionsInPercent));

  // refs

  // computed local data
  const fishStyle = calculateFishStyle(userPosition);
  const bubbleStyle = calculateBubbleStyle(userPosition, bubbleDimensionsInPercent);
  const imageUrl = backendUrl + "uploads/" + avatar;


  //effects

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return (() => {
      window.removeEventListener('resize', handleResize);
    })
  }, [])
  
  useEffect(() => {
    setUserPosition(calculateUserPosition(position, widthToHeightRatio, oceanSize, screenSize, bubbleDimensionsInPercent))
  }, [position, widthToHeightRatio, oceanSize, screenSize, bubbleDimensionsInPercent])

  return (
    <div className={styles.container} >
      <Bubble newMessage={newMessage} messages={messages} updateBubbleDimensions={updateBubbleDimensions} style={bubbleStyle} />
      <div className={`${styles.fish} ${styles[movement]}`} title={username} style={fishStyle}>
        {avatar ?
          <UserImage url={imageUrl} widthToHeightRatio={widthToHeightRatio} /> :
          <FishImage fill={color} darkColor={darkenColor(color)} id={id} />}
      </div>
    </div>
  );

  //local functions, event handlers

  function handleResize() {
    setScreenSize({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }

  function updateBubbleDimensions(bubbleSize: dimensions) {
    const bubbleHeightInPercent = bubbleSize.height / oceanSize.height * 100 || 0;
    const bubbleWidthInPercent = bubbleSize.width / oceanSize.width * 100 || 0;
    setBubbleDimensionsInPercent({height:bubbleHeightInPercent, width:bubbleWidthInPercent});
  }
};

//pure functions

function calculateAvailableOcean(widthToHeightRatio: number, oceanSize: dimensions, screenSize: dimensions) {
  const avatarsLongestSide = parseInt(variables.avatarsLongestSide);
  const landscapeOrientedAvatar = widthToHeightRatio > 1;
  const oceanHeightInVh = oceanSize.height / screenSize.height;
  const screenWidthToHeightRatio = screenSize.width / screenSize.height; //hur många vh är en vw
  const avatarWidthInVw = landscapeOrientedAvatar ? avatarsLongestSide : avatarsLongestSide * widthToHeightRatio;
  const avatarHeightInVh = landscapeOrientedAvatar ? avatarsLongestSide / widthToHeightRatio * screenWidthToHeightRatio : avatarsLongestSide * screenWidthToHeightRatio;
  const avatarHeightInPercentOfOceanHeight = avatarHeightInVh / oceanHeightInVh
  const availableHeight = 100 - avatarHeightInPercentOfOceanHeight
  const availableWidth = 100 - avatarWidthInVw;
  const availableOcean = { height: availableHeight, width: availableWidth };
  return availableOcean;
}

function calculateUserPosition(position: position, widthToHeightRatio: number, oceanSize: dimensions, screenSize: dimensions, bubbleDimensionsInPercent:dimensions) {
  const availableOcean = calculateAvailableOcean(widthToHeightRatio, oceanSize, screenSize);
  let userPositionTop = position.top / 100 * availableOcean.height
  const userPositionLeft = position.left / 100 * availableOcean.width;
  //finns det ett bättre sätt att stoppa vid en position?
  if (userPositionTop < bubbleDimensionsInPercent.height * 0.65) { userPositionTop = bubbleDimensionsInPercent.height * 0.65 }
  const userPosition = { top: userPositionTop, left: userPositionLeft };
  return userPosition
}

function calculateBubbleStyle(userPosition: position, bubbleDimensionsInPercent:dimensions) {
  let positionBottom = 100 - userPosition.top
  let positionTop = userPosition.top - bubbleDimensionsInPercent.height;
  //finns det ett bättre sätt att stoppa vid en position?
  if (positionTop < 0) {positionBottom = 100 - bubbleDimensionsInPercent.height}
  return {
    position: "absolute",
    bottom: positionBottom + "%",
    left: userPosition.left + "%",
  } as React.CSSProperties;
}

function calculateFishStyle(userPosition: position) {
  return {
    position: "absolute",
    top: userPosition?.top + "%",
    left: userPosition?.left + "%",
  } as React.CSSProperties;
}