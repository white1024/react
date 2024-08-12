import '../CalendarStyle.css';
const WeekDayNameList = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export default function WeekDay() {
  let weekDayList = [];
  return (
      <div className="weekDayContainerStyle">
        {
          weekDayList = WeekDayNameList.map((name, idx)=>
          <span className="weekDayStyle" key={`name-${idx}`}>
            {name}
          </span>)
        }
      </div>
      );
}