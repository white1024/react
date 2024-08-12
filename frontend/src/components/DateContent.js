import React, {useContext} from "react";
import getWeeksInMonth from "./utils";
import '../CalendarStyle.css';
import { AppStore }from "../Calendar";
import moment from "moment";

export default function DateContent(){
    const {timeReducer} =  useContext(AppStore);
    const date = timeReducer[0];
    const mmt = new moment(date);

    let weekContentList = getWeeksInMonth(mmt);
    let result = [];
    return (
      <div className="DateContainer">
        {
          weekContentList.map((week, wIdx)=>{
            let aWeek = [];
            aWeek = week.map((day, dIdx)=>
              <span className="dayStyle" key={`${day}-${dIdx}`}>{day===0?"":day}</span>)
            return <div className="aWeekStyle" key={`${week}-${wIdx}`}>{aWeek}</div>;
            
          })
        }
        {result}
      </div>
      )
  }