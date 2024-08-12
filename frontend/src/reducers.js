// reducers.js
import moment from "moment";

// reducers func
export default function reducers(stateTime, action){
    let type = action.type; 
    const mmt = new moment(stateTime);
  
    switch(type){
      case "LAST_MONTH":
        mmt.subtract(1, "month");
        break;
  
      case "NEXT_MONTH":
        mmt.add(1, "month");
        break;

      default: 
        break
    }
  
    console.log(mmt.format("YYYY-MM-DD"));
    return mmt.format("YYYY-MM-DD");
  }