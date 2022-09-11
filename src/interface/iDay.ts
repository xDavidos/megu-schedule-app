import ILessons from './iLesson'

export default interface IDay {
  id: number;
  date: string;
  lessons: Array<ILessons>
}