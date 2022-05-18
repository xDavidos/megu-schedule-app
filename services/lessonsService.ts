import moment from 'moment';

export function lessonsToday(lessons) {
  for(let i = 0; i < lessons.length; i++)
  {
    if (lessons[i].date == moment().startOf('day').toJSON())
      return i;
  }
  return 0;
}