// Calendar.js
import React, {useReducer, createContext} from "react";
import moment from "moment";
import './CalendarStyle.css';
import reducers from "./reducers"

// components
import Header from "./components/Header";
import WeekDay from "./components/WeekDay";
import DateContent from "./components/DateContent";

// context store
export const AppStore = createContext();

// Calendar component
export default function Calendar() {
  const mmt = new moment();
  const timeReducer = useReducer(reducers, mmt.format("YYYY-MM-DD"));

  return (
    <AppStore.Provider value={{timeReducer:timeReducer}}>
      <div>
        <h1>{"Calendar Demo"}</h1>
        <div className="calendar-container">
          <Header />
          <WeekDay />
          <DateContent />
        </div>
      </div>
    </AppStore.Provider>
  );
}