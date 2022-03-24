const convertHours = (timeTogether) => {
  const day = Math.floor(timeTogether / 24);
  const hour = Math.floor(timeTogether % 24);
  if (day === 0 && hour === 1) return `${hour} hour`;
  else if (day === 0 && hour > 1) return `${hour} hours`;
  else if (day === 1 && hour === 0) return `${day} day`;
  else if (day === 1 && hour === 1) return `${day} day ${hour} hour`;
  else if (day === 1 && hour > 1) return `${day} day ${hour} hours`;
  else if (day > 1 && hour === 0) return `${day} days`;
  else if (day > 1 && hour === 1) return `${day} days ${hour} hour`;
  else if (day > 1 && hour > 1) return `${day} days ${hour} hours`;
  else return `${day} days ${hour} hours, please check again`;
};

export default convertHours;
