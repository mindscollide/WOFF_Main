import dayjs from "dayjs";

export const removeDashesFromDate = (data) => {
  let value = data.split("-");
  return `${value[0]}${value[1]}${value[2]}`;
};
export const DateDisplayFormat = (data) =>{
  let returnValues="";
  let value = data.split(";");
  console.log("valuevalue",value)
  let check =parseInt(value.length);
  check=check-1
  value.map((date,index)=>{
   let newDate=date.trim()
   if(check!=index){
   returnValues = returnValues + newDate.slice(6, 8) + "-" + newDate.slice(4, 6) + "-" + newDate.slice(0, 4) + " ; "
   }else{
    returnValues = returnValues + newDate.slice(6, 8) + "-" + newDate.slice(4, 6) + "-" + newDate.slice(0, 4) 
   }

  })
  // returnValues=returnValues.substring(0, returnValues.length - 1)
  console.log("returnValues",returnValues)
  return returnValues;
  // data.slice(6, 8) + "-" + data.slice(4, 6) + "-" + data.slice(0, 4);
}
 

export const DateSendingFormat = (data) => {
  if(data.length>0){
    let value = data.split("-");
    return `${value[2]}${value[1]}${value[0]}`;
  }
};
export const currentToOneYearBackDate = (format) => {
  // this function tools date format as an argument
  //i.e YYYYMMDD , DDMMYYYY like this

  // dayjs values are immutable, so derive both dates from one value
  let today = dayjs();

  let toDate = today.format(format);
  let fromDate = today.subtract(1, "year").format(format);
  return { toThisDate: toDate, fromThisDate: fromDate };
  // console.log(toDate, fromDate);
};
export const NumberFormater=(value)=>{
  return parseFloat(parseFloat(value).toFixed(2))
}
export const CommaFormter =(num)=>{
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}