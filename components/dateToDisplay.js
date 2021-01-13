function dateToDisplay(date) {
  const dayOftheWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let dateFormat = new Date(date);
  let newDay = dayOftheWeek[dateFormat.getDay()];
  let newDate = dateFormat.getDate();
  let newMonth = months[dateFormat.getMonth()];

  return `${newDay}, ${newDate} ${newMonth}`;
}

export default dateToDisplay;