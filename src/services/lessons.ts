import moment from 'moment';

export function lessonsToday(lessons: any) {
  for (let i = 0; i < lessons.length; i++) {
    if (lessons[i].date == moment().startOf('day')) {
      return i;
    }
  }
  return 0;
}