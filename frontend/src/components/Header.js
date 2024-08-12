// Header.js
import React, {useContext} from "react";
import '../CalendarStyle.css';
import { AppStore }from "../Calendar";
import moment from "moment";

export default function Header(){
  const { timeReducer } = useContext(AppStore);
  const dateInfo = timeReducer[0];
  const mmt = new moment(dateInfo);

  const dispatch = timeReducer[1];

  return (
    <div className="headerContainer" >
      <span className="headerMonthYearStyle">{mmt.format("MMM-YYYY")}</span>
      <span className="headerButtonStyle" onClick={()=>dispatch({type:"LAST_MONTH"})}> {"<"} </span>
      <span className="headerButtonStyle" onClick={()=>dispatch({type:"NEXT_MONTH"})}> {">"} </span>
    </div>
  )
}