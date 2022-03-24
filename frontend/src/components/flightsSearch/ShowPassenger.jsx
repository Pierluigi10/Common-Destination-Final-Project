import SelectDates from "./SelectDates.jsx";
import SelectDepartureAirport from "./SelectDepartureAirport.jsx";
import icons from "../../functions/icons.js";

const ShowPassenger = ({
  passenger,
  handlePassengerChange,
  handlePassengerDelete,
  departureAirports,
  canDelete,
  stayTimeTogether,
  airportsError,
  datesError,
  markedErrors,
  earliestReturn,
  lastestOutbound,
  setOtboundLaterThanReturn,
  noMeeting,
}) => {
  const handleChangeField = (key, value) => {
    passenger[key] = value;
    handlePassengerChange();
  };

  return (
    <div
      className="showPassenger"
      style={{ opacity: airportsError || datesError ? 0.5 : 1 }}
    >
      <div className="outerContainer">
        <SelectDepartureAirport
          className="SelectDepartureInput"
          departureAirports={departureAirports}
          airport={passenger.airport}
          handleChangeField={handleChangeField}
          markedErrors={markedErrors}
        />
        <SelectDates
          handleChangeField={handleChangeField}
          minOutboundDate={passenger.minOutboundDate}
          maxReturnDate={passenger.maxReturnDate}
          stayTimeTogether={stayTimeTogether}
          markedErrors={markedErrors}
          earliestReturn={earliestReturn}
          lastestOutbound={lastestOutbound}
          setOtboundLaterThanReturn={setOtboundLaterThanReturn}
          noMeeting={noMeeting}
        />
      </div>
      {canDelete && (
        <icons.RiDeleteBinLine
          className="deletePassenger"
          onClick={() => handlePassengerDelete(passenger.id - 1)}
        />
      )}
    </div>
  );
};

export default ShowPassenger;
