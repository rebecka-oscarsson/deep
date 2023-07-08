import { useEffect, useState } from "react";
import FishImage from "./Avatars/FishImage";
import UserImage from "./Avatars/UserImage"
import Bubble from "./Bubble/Bubble";
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
  const [userPosition, setUserPosition] = useState(calculateUserPosition(position, widthToHeightRatio, oceanSize, screenSize));
  const [bubbleDimensions, setBubbleDimensions] = useState({ height: 0, width: 0 });

  // refs

  // computed local data
  const fishStyle = getFishStyle(userPosition)
  const bubbleStyle = getBubbleStyle(userPosition)
  const imageUrl = backendUrl + "uploads/" + avatar;

  //effects
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return (() => {
      window.removeEventListener('resize', handleResize);
    })
  }, [])

  // useEffect(() => {
  //   calculateUserPosition()
  // }, [bubbleDimensions, messages])

  useEffect(() => {
    setUserPosition(calculateUserPosition(position, widthToHeightRatio, oceanSize, screenSize))
  }, [position, widthToHeightRatio, oceanSize, screenSize])

  const updateBubbleDimensions = (dimensions: dimensions) => {
    setBubbleDimensions(dimensions);
  }

  return (
    <div className={styles.container} >
      <Bubble newMessage={newMessage} messages={messages} updateBubbleDimensions={updateBubbleDimensions} style={bubbleStyle} />
      <div className={styles[movement]} title={username} style={fishStyle}>
        {/*       
       <ul>
        <li><strong>height {bubbleDimensions.height}</strong></li>
        <li><strong>width {bubbleDimensions.width}</strong></li>
      </ul>      */}
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
};

//pure functions

function calculateAvailableOcean(widthToHeightRatio: number, oceanSize: dimensions, screenSize: dimensions) {
  const avatarsLongestSide = parseInt(variables.avatarsLongestSide);
  const landscapeOrientedAvatar = widthToHeightRatio > 1;
  //const bubbleHeightInPercent = bubbleDimensions.height? oceanSize.height/bubbleDimensions.height: 0;
  //const bubbleWidthInPercent = bubbleDimensions.width? oceanSize.width/bubbleDimensions.width: 0;
  const oceanHeightInVh = oceanSize.height / screenSize.height;
  const screenWidthToHeightRatio = screenSize.width / screenSize.height; //hur många vh är en vw
  const avatarWidthInVw = landscapeOrientedAvatar ? avatarsLongestSide : avatarsLongestSide * widthToHeightRatio;
  const avatarHeightInVh = landscapeOrientedAvatar ? avatarsLongestSide / widthToHeightRatio * screenWidthToHeightRatio : avatarsLongestSide * screenWidthToHeightRatio;
  const avatarHeightInPercentOfOceanHeight = avatarHeightInVh / oceanHeightInVh
  const availableHeight = 100 - avatarHeightInPercentOfOceanHeight;
  const availableWidth = 100 - avatarWidthInVw;
  const availableOcean = { height: availableHeight, width: availableWidth };
  return availableOcean;
}

function calculateUserPosition(position: position, widthToHeightRatio: number, oceanSize: dimensions, screenSize: dimensions) {
  const availableOcean = calculateAvailableOcean(widthToHeightRatio, oceanSize, screenSize);
  const userPositionTop = position.top / 100 * availableOcean.height
  const userPositionLeft = position.left / 100 * availableOcean.width
  const userPosition = { top: userPositionTop, left: userPositionLeft };
  return userPosition
}

function getBubbleStyle(userPosition: position) {
  //const bubbleHeightInPercent = bubbleDimensions.height? oceanSize.height/bubbleDimensions.height: 0;
  //const bubbleWidthInPercent = bubbleDimensions.width? oceanSize.width/bubbleDimensions.width: 0;
  //console.log('hav i pixlar ', oceanSize, 'bubbla bredd ', bubbleWidthInPercent, bubbleDimensions.width, '%, höjd ', bubbleHeightInPercent, bubbleDimensions.height) //det stämmer inte, procenten går åt fel håll
  return {
    position: "absolute",
    bottom: userPosition?.top && 100 - userPosition.top + "%",
    left: userPosition?.left && userPosition.left + "%",
  } as React.CSSProperties;
}

function getFishStyle(userPosition: position) {
  return {
    position: "absolute",
    top: userPosition?.top + "%",
    left: userPosition?.left + "%",
  } as React.CSSProperties;
}