import { useEffect, useState, useRef } from "react";
import styles from "./fish.module.scss";
import variables from "../../variables.module.scss";
import FishImage from "../Avatars/FishImage";
import UserImage from "../Avatars/UserImage"
import Bubble from "../Bubble/Bubble";
import { darkenColor, backendUrl } from "../../services"

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

interface FishProps {
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

const Fish = ({
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
}: FishProps) => {

  const fishRef = useRef<HTMLDivElement>(null);

  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  const setDimension = () => {
    setScreenSize({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }
  
  useEffect(() => {
    window.addEventListener('resize', setDimension);
    
    return(() => {
        window.removeEventListener('resize', setDimension);
    })
  }, [screenSize])

    function calculateAvailableOcean() {
    const avatarsLongestSide = parseInt(variables.avatarsLongestSide);
    const landscapeOrientedAvatar = widthToHeightRatio > 1;
    //const bubbleHeightInPercent = bubbleDimensions.height? oceanSize.height/bubbleDimensions.height: 0;
    //const bubbleWidthInPercent = bubbleDimensions.width? oceanSize.width/bubbleDimensions.width: 0;
    const oceanHeightInVh = oceanSize.height/screenSize.height;
    const screenWidthToHeightRatio = screenSize.width/screenSize.height; //hur många vh är en vw
    const avatarWidthInVw = landscapeOrientedAvatar? avatarsLongestSide : avatarsLongestSide * widthToHeightRatio;
    const avatarHeightInVh = landscapeOrientedAvatar? avatarsLongestSide/widthToHeightRatio*screenWidthToHeightRatio : avatarsLongestSide*screenWidthToHeightRatio;
    const avatarHeightInPercentOfOceanHeight = avatarHeightInVh/oceanHeightInVh
    const availableHeight = 100 - avatarHeightInPercentOfOceanHeight;
    const availableWidth = 100 - avatarWidthInVw;
    const availableOcean = { height: availableHeight, width: availableWidth };
    return availableOcean;
  }

//äldsta version
  //   function calculateAvailableOcean() {
  //   const avatarsLongestSide = parseInt(variables.avatarsLongestSide);
  //   const landscapeOrientedAvatar = widthToHeightRatio > 1;
  //   const screenWidthToHeightRatio = window.innerWidth / window.innerHeight;
  //   const bubbleHeightInPercent = bubbleDimensions.height? oceanSize.height/bubbleDimensions.height: 0;
  //   const bubbleWidthInPercent = bubbleDimensions.width? oceanSize.width/bubbleDimensions.width: 0;
  //   console.log(bubbleHeightInPercent)
  //   //const additionalBubbleWidth = (messages.length > 0) ? avatarsLongestSide : 0
  //   const availableHeight = landscapeOrientedAvatar ? 100 - bubbleHeightInPercent - avatarsLongestSide * widthToHeightRatio * screenWidthToHeightRatio : 100 - bubbleHeightInPercent - avatarsLongestSide * screenWidthToHeightRatio;
  //   const availableWidth = landscapeOrientedAvatar ? 100 - avatarsLongestSide : 100 - bubbleWidthInPercent - avatarsLongestSide * widthToHeightRatio;
  //   const availableOcean = { height: availableHeight, width: availableWidth };
  //   return availableOcean;
  // }

  //försök med uträkning av fiskens storlek, funkar ej eftersom den fås efter rendering
  // function calculateAvailableOcean() {
  //   console.log(fishDimensions)
  //   const fishWidthInPercent = fishDimensions?.width? oceanSize.width/fishDimensions.width: 0;
  //   const fishHeightInPercent = fishDimensions?.height? oceanSize.height/fishDimensions.height: 0;
  //   const availableHeight = 100 - fishHeightInPercent;
  //   const availableWidth = 100 - fishWidthInPercent;
  //   const availableOcean = { height: availableHeight, width: availableWidth };
  //   console.log(availableOcean)
  //   return availableOcean;
  // }

  function calculateUserPosition() {
    const availableOcean = calculateAvailableOcean();
    const userPositionTop = position.top / 100 * availableOcean.height
    const userPositionLeft = position.left / 100 * availableOcean.width
    const userPosition = {top: userPositionTop, left: userPositionLeft};
    return userPosition
  }

  const [userPosition, setUserPosition] = useState<{top: number, left:number}>(calculateUserPosition());
  const [bubbleDimensions, setBubbleDimensions] = useState({ height: 0, width: 0 });
  //const [fishDimensions, setFishDimensions] = useState<dimensions|null|undefined>(calculateFishDimensions());

  const style = {
    position: "absolute",
    top: userPosition?.top + "%",
    left: userPosition?.left + "%",
  } as React.CSSProperties;

  function bubbleStyle() {
    const bubbleHeightInPercent = bubbleDimensions.height? oceanSize.height/bubbleDimensions.height: 0;
    const bubbleWidthInPercent = bubbleDimensions.width? oceanSize.width/bubbleDimensions.width: 0;
    //console.log('hav i pixlar ', oceanSize, 'bubbla bredd ', bubbleWidthInPercent, bubbleDimensions.width, '%, höjd ', bubbleHeightInPercent, bubbleDimensions.height) //det stämmer inte, procenten går åt fel håll
    return {
    position: "absolute",
    bottom: userPosition?.top && 100-userPosition.top + "%",
    left: userPosition?.left && userPosition.left + "%",
  } as React.CSSProperties;}

  // useEffect(() => {
  //   window.addEventListener('resize', calculateUserPosition);
  //   return (() => {
  //     window.removeEventListener('resize', calculateUserPosition);
  //   })
  // }, [])

  // useEffect(() => {
  //   calculateUserPosition()
  // }, [bubbleDimensions, messages])

    useEffect(() => {
    setUserPosition(calculateUserPosition())
  }, [position])

  const imageUrl = backendUrl + "uploads/" + avatar;

  const updateBubbleDimensions = (dimensions: dimensions) => {
    setBubbleDimensions(dimensions);
  }

  // useEffect(() => {
  //   window.addEventListener('resize', calculateFishDimensions);
  //   return (() => {
  //     window.removeEventListener('resize', calculateFishDimensions);
  //   })
  // }, [])

  // useEffect(() => {
  //   if (!fishRef.current?.offsetHeight) {
  //     return;
  //   }
  //   setFishDimensions(calculateFishDimensions());
  // }, [fishRef]);

  // useEffect(() => {
  //   if (!fishRef.current?.offsetHeight) {
  //     return;
  //   }
  //   setFishDimensions({height: fishRef?.current?.clientHeight, width: fishRef?.current?.clientWidth});
  // }, [fishRef?.current?.offsetHeight, fishRef?.current?.clientWidth]);

  // function calculateFishDimensions() {
  //   const fishDimensions = fishRef?.current?.offsetHeight? {height: fishRef?.current?.offsetHeight, width: fishRef?.current?.offsetWidth} : null;
  //   return fishDimensions
  // }


  return (
    <div className={styles.container} >
      {/* ref={fishRef} */}
      {/* {messages?.length > 0 && */}
        <Bubble newMessage={newMessage} messages={messages} updateBubbleDimensions={updateBubbleDimensions} style={bubbleStyle()}/>
      {/* } */}
      <div className={styles[movement]} title={username} style={style}>
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
};

export default Fish;
