const formatDate = (date) => {
  const currentTimeInMs = new Date().getTime();
  const timeInMs = new Date(date).getTime();
  const seconds = (currentTimeInMs - timeInMs) / 1000;

  if (seconds >= 31536000) {
      const years = Math.round(seconds / 31536000);
      let text = 'years';
      if(years <= 1) {
        text = 'year';
      }
      return `${years} ${text}`;
  } else if (seconds >= 2419200) {
      const months = Math.round(seconds / 2419200);
      let text = 'months';
      if(months <= 1) {
        text = 'month';
      }
      return `${months} ${text}`;
  } else if (seconds >= 86400) {
    const days = Math.round(seconds / 86400);
      let text = 'days';
      if(days <= 1) {
        text = 'day';
      }
      return `${days} ${text}`;
  } else if (seconds >= 3600) {
    const hours = Math.round(seconds / 3600);
      let text = 'hours';
      if(hours <= 1) {
        text = 'hour';
      }
      return `${hours} ${text}`;
  } else if (seconds >= 60) {
    const minutes = Math.round(seconds / 60);
      let text = 'minutes';
      if(minutes <= 1) {
        text = 'minute';
      }
      return `${minutes} ${text}`;
  } else {
      return `${seconds} seconds`;
  }
}

module.exports = formatDate;

