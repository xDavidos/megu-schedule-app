import { day } from "../context/loadingLessons";

export default function selectToday(data: Array<day>) {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  console.log(data);
  return data.findIndex(elem => elem.date.toString() === date.toString());
}