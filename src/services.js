export const backendUrl = process.env.NODE_ENV === 'development' ? "http://localhost:4000/" : "https://chat-backend-djp6.onrender.com/";

//gör om tiden från backend till användarens tidszon + snyggt format
export function formatTime(time) {
  let date = new Date(time);
  let timeStamp = Intl.DateTimeFormat("en", {
    weekday: "long",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).format(date);
  return timeStamp;
}

export function randomVal(min, max) {
  //ger slumpsiffror till färggenerering
  return Math.floor(Math.random() * (max - min) + 1) + min;
}

//genererar slumpad färg
//hue kan vara mellan 0-360, saturation 0-100, lightness 0-100
export const userColor =
  "hsl(" +
  randomVal(0, 360) +
  ", " +
  randomVal(60, 80) +
  "%, " +
  randomVal(70, 90) +
  "%)";

//gör en mörkare variant av en färg
export function darkenColor(color) {
let splitColor =  color.split(',');
let lightness = splitColor[2]
let lightnessNumber = parseInt(lightness.slice(0,lightness.length-2));
const darkerNumber = Math.round(lightnessNumber*0.5);
let darkColor = `${splitColor[0]},${splitColor[1]}, ${String(darkerNumber)}%)`
return darkColor
}