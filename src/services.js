//gör om tiden från backend till användarens tidszon + snyggt format
function formatTime(time) {
    let date = new Date(time);
    let timeStamp = Intl.DateTimeFormat('en', {
        weekday: 'long',
        hour: "numeric",
        minute: "numeric",
        hour12: false
      }).format(date);
      return timeStamp
  }