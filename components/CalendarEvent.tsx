export const CalendarEvent = ({ title, date }) => {
  console.log("title ", title);
  console.log("date ", date);
  return <div className="bg-slate-200">{title}</div>;
};
