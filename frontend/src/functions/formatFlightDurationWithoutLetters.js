const formatFlightDurationWithoutLetters = (flightDuration) => {
  const getSplited = flightDuration.split(" ");
  const getSlicedHour = getSplited[0];
  const getSlicedMinutes = getSplited[3];
  if (getSlicedMinutes === "00" || getSlicedMinutes === "") {
    return `${getSlicedHour}:00`;
  }
  if (
    getSlicedMinutes === "0" ||
    getSlicedMinutes === "1" ||
    getSlicedMinutes === "2" ||
    getSlicedMinutes === "3" ||
    getSlicedMinutes === "4" ||
    getSlicedMinutes === "5" ||
    getSlicedMinutes === "6" ||
    getSlicedMinutes === "7" ||
    getSlicedMinutes === "8" ||
    getSlicedMinutes === "9"
  ) {
    return `${getSlicedHour}:0${getSlicedMinutes}`;
  } else return `${getSlicedHour}:${getSlicedMinutes}`;
};

export default formatFlightDurationWithoutLetters;
