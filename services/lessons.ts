import moment from 'moment';

export function lessonsToday(lessons: any) {
  for(let i = 0; i < lessons.lessons.length; i++)
  {
    if (lessons.lessons[i].date == moment().startOf('day').unix())
    {
      return i;
    }
  }
  return 0;
}