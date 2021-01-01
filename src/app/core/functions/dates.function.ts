const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();
const currentDay = new Date().getDate();

export function dateBuilder() {
  const dateTuple = [currentYear, currentMonth, currentDay];
  return dateTuple;
}
