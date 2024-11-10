const formatDate = (date) => {
  const now = new Date();
  const dateString = new Date(date);
  const diffInSeconds = Math.max(Math.floor((now - dateString) / 1000), 0);

  const secondsInMinute = 60;
  const secondsInHour = 3600;
  const secondsInDay = 86400;
  const secondsInMonth = 2592000;

  if (diffInSeconds < secondsInMinute) {
    return `${diffInSeconds} seconds ago`;
  } else if (diffInSeconds < secondsInHour) {
    const minutes = Math.floor(diffInSeconds / secondsInMinute);
    return `${minutes} minutes ago`;
  } else if (diffInSeconds < secondsInDay) {
    const hours = Math.floor(diffInSeconds / secondsInHour);
    return `${hours} hours ago`;
  } else if (diffInSeconds < secondsInMonth) {
    const days = Math.floor(diffInSeconds / secondsInDay);
    if (days === 1) {
      return (
        "Yesterday at " +
        dateString.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    } else {
      return `${days} days ago`;
    }
  } else {
    return `${dateString.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
    })} at ${dateString.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  }
};

export default formatDate;
