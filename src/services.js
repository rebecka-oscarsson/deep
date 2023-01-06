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

export const handleLeaveChat = (socket, navigate) => {
  socket.close();
  localStorage.removeItem("userName");
  navigate("/");
  //window.location.reload();
};