import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

const today = new Date();

const SelectDates = ({
  handleChangeField,
  minOutboundDate,
  maxReturnDate,
  stayTimeTogether,
  markedErrors,
  earliestReturn,
  lastestOutbound,
  setOtboundLaterThanReturn,
  noMeeting,
}) => {
  const [dateAreValid, setDateAreValid] = useState(false);
  const [outboundIsEmpty, setOutboundIsEmpty] = useState(true);
  const [returnIsEmpty, setReturnIsEmpty] = useState(true);
  const [maxOutbound, setMaxOutbound] = useState(
    new Date(moment(today).add(1, "years"))
  );
  const minOutbound = new Date(moment(today));
  const minReturn = new Date(
    moment(minOutboundDate !== "" ? minOutboundDate : today).add(
      stayTimeTogether,
      "hours"
    )
  );
  const maxReturn = new Date(moment(today).add(1, "years"));

  useEffect(() => {
    const timeDifferenceInHours = moment(maxReturnDate).diff(
      moment(minOutboundDate),
      "hours"
    );
    timeDifferenceInHours >= stayTimeTogether
      ? setDateAreValid(true)
      : setDateAreValid(false);

    dateAreValid
      ? setOtboundLaterThanReturn(true)
      : setOtboundLaterThanReturn(false);

    minOutboundDate === ""
      ? setOutboundIsEmpty(true)
      : setOutboundIsEmpty(false);

    maxReturnDate === "" ? setReturnIsEmpty(true) : setReturnIsEmpty(false);

    // handleChangeField(
    //   "minOutboundDate",
    //   minOutboundDate === "" && maxReturnDate !== ""
    //     ? new Date(moment(maxReturnDate).subtract(stayTimeTogether, "hours"))
    //     : minOutboundDate
    // );

    handleChangeField(
      "maxReturnDate",
      timeDifferenceInHours < stayTimeTogether
        ? new Date(moment(minOutboundDate).add(stayTimeTogether, "hours"))
        : maxReturnDate
    );

    setMaxOutbound(
      new Date(
        moment(today).add(1, "years").subtract(stayTimeTogether, "hours")
      )
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minOutboundDate, maxReturnDate, setDateAreValid, stayTimeTogether]);

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);
    return currentDate.getTime() < selectedDate.getTime();
  };

  return (
    <div className="selectDates">
      <DatePicker
        className={
          (outboundIsEmpty && markedErrors) ||
          (!dateAreValid && markedErrors) ||
          (moment(lastestOutbound).format("YYYY-MM-DD HH:mm") ===
            moment(minOutboundDate).format("YYYY-MM-DD HH:mm") &&
            markedErrors &&
            !outboundIsEmpty &&
            noMeeting)
            ? "dateError datePicker"
            : "datePicker"
        }
        placeholderText={"earliest start"}
        minDate={minOutbound}
        maxDate={maxOutbound}
        selected={minOutboundDate}
        onChange={(date) => {
          handleChangeField("minOutboundDate", date);
        }}
        showTimeSelect
        filterTime={filterPassedTime}
        timeFormat="HH:mm"
        timeIntervals={60}
        dateFormat="dd-MMM-yyyy HH:mm"
      />
      <DatePicker
        className={
          (returnIsEmpty && markedErrors) ||
          (!dateAreValid && markedErrors) ||
          (moment(earliestReturn).format("YYYY-MM-DD HH:mm") ===
            moment(maxReturnDate).format("YYYY-MM-DD HH:mm") &&
            markedErrors &&
            !returnIsEmpty &&
            noMeeting)
            ? "dateError datePicker"
            : "datePicker"
        }
        placeholderText={"latest return"}
        minDate={minReturn}
        maxDate={maxReturn}
        selected={maxReturnDate}
        onChange={(date) => {
          handleChangeField("maxReturnDate", date);
        }}
        showTimeSelect
        filterTime={filterPassedTime}
        timeFormat="HH:mm"
        timeIntervals={60}
        dateFormat="dd-MMM-yyyy HH:mm"
      />
    </div>
  );
};
export default SelectDates;
