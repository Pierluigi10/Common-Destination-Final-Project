import React, { useState, useEffect } from "react";
import icons from "../../functions/icons.js";
import * as SmallComponents from "../SmallComponents.jsx";
import popUp from "../../data/popUp.json";

function GeneralCriteria({
  passengers,
  stayTimeTogether,
  setStayTimeTogether,
  datesError,
  airportsError,
  setErrorsToggle,
  datesAreEmpty,
  noMeeting,
  otboundLaterThanReturn,
}) {
  const [daysCounter, setDaysCounter] = useState(1);
  const [hoursCounter, setHoursCounter] = useState(0);
  const [mettingTimeInfos, setMeetingTimeInfos] = useState(false);

  useEffect(() => {
    setStayTimeTogether(daysCounter * 24 + hoursCounter);
  }, [
    daysCounter,
    hoursCounter,
    passengers,
    stayTimeTogether,
    setStayTimeTogether,
  ]);

  const infosPopUpToggle = () => {
    mettingTimeInfos ? setMeetingTimeInfos(false) : setMeetingTimeInfos(true);
  };
  return (
    <div className="generalCriteria">
      {(datesError || airportsError) && (
        <SmallComponents.PopUps
          className="passengerCriteriaError"
          text1={
            datesError &&
            otboundLaterThanReturn &&
            popUp.datesErrors.otboundLaterThanReturn
          }
          text2={datesError && noMeeting && popUp.datesErrors.withoutMeeting}
          text3={datesError && datesAreEmpty && popUp.datesErrors.detesAreEmpty}
          text4={airportsError && popUp.airportsErrors}
          setErrorsToggle={setErrorsToggle}
        />
      )}

      <label>
        {mettingTimeInfos && (
          <SmallComponents.Infos
            className="bubble "
            text={popUp.meetingDuration}
            setInfos={setMeetingTimeInfos}
          />
        )}

        <div className="stayTimeTogether">
          <icons.FaInfoCircle className="iconInfo" onClick={infosPopUpToggle} />
          <span>duration</span>
          {daysCounter === 1 && (
            <>
              <icons.FaMinusCircle
                className="iconsPlusMinus"
                onClick={() => {
                  if (daysCounter < 2) {
                    setHoursCounter(22);
                  }
                  if (daysCounter >= 1) {
                    setDaysCounter((prev) => prev - 1);
                  }
                }}
              />

              <p className="daysCounter">{daysCounter}</p>
              <icons.FaPlusCircle
                className="iconsPlusMinus"
                onClick={() => setDaysCounter((prev) => prev + 1)}
              />
              <p className="flightSearchTopText">day</p>
            </>
          )}

          {daysCounter >= 2 && (
            <>
              <icons.FaMinusCircle
                className="iconsPlusMinus"
                onClick={() => {
                  if (daysCounter < 2) {
                    setHoursCounter(22);
                  }
                  if (daysCounter >= 1) {
                    setDaysCounter((prev) => prev - 1);
                  }
                }}
              />

              <p className="daysCounter">{daysCounter}</p>
              <icons.FaPlusCircle
                className="iconsPlusMinus"
                onClick={() => setDaysCounter((prev) => prev + 1)}
              />
              <p className="flightSearchTopText">days</p>
            </>
          )}

          {daysCounter < 1 && (
            <>
              <icons.FaMinusCircle
                className="iconsPlusMinus"
                onClick={() => {
                  if (hoursCounter < 24 && hoursCounter > 2)
                    return setHoursCounter((prev) => prev - 2);
                  // if (hoursCounter === 24) return setHoursCounter(0);
                }}
              />
              <p className="hoursCounter">{hoursCounter}</p>
              <icons.FaPlusCircle
                className="iconsPlusMinus"
                onClick={() => {
                  if (hoursCounter >= 22) {
                    setDaysCounter(1);
                    setHoursCounter(0);
                  }
                  if (hoursCounter < 24) {
                    setHoursCounter((prev) => prev + 2);
                  }
                }}
              />
              <p className="flightSearchTopText">hours</p>
            </>
          )}
          <div className="passengersLenght">
            <icons.BsPeopleFill className="passengersIcon" />
            <span className="passengersAmount">{passengers.length}</span>
          </div>
        </div>
      </label>
    </div>
  );
}

export default GeneralCriteria;
