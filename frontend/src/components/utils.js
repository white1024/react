// utils.js
// GLobal Vars
const SEVENDAYS = 7; // 建立一個通用變數，存放一週有7天

function processWeekDays(mmt, isFirstWeek=false){
  // get first day of a week, ex: Thursday
  const totalDays = mmt.daysInMonth();
  const startDay = isFirstWeek? 
  mmt.startOf("month").day():0;

  const weekDays = Array(SEVENDAYS).fill(0);
  let isFinished = false;
  for(let d=startDay; d<SEVENDAYS; d++){
    weekDays[d] = mmt.date();
    if(mmt.date()!==totalDays)
      mmt.add(1, "day");
    else{
      isFinished=true;
      break;
    }
      
  }

  // console.log("weekDays", weekDays);
  return {weekDays, isFinished};
}

export default function getWeeksInMonth(mmt){
  const weekDayList = [];

  // first weekDays
  const {weekDays} = processWeekDays(mmt, true);
  weekDayList.push(weekDays);

  let loopStatus = false;
  // create
  while(!loopStatus){
    let result = processWeekDays(mmt);
    const {weekDays} = result;
    weekDayList.push( weekDays );

    loopStatus = result["isFinished"];
  }
  
  return weekDayList;
}