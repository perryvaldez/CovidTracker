import config from '../config.json';

const currentDate = (): Date => {
  const c = config as any;
  let d = new Date();

  if(c.currentDate) {
    d = new Date(c.currentDate);
  }

  return extractDate(d);
}

const compareDates = (a: Date, b: Date): number => {
  return (a.getTime() - b.getTime());
};

const dateAddDays = (d: Date, days: number): Date => new Date(d.getTime() + days * 24 * 60 * 60 * 1000);

const extractDate = (d: Date): Date => new Date(d.getFullYear(), d.getMonth(), d.getDate());

const monthsArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const toShortDate = (d: Date) => `${monthsArr[d.getMonth()]} ${d.getDate()}`;

const toDateStamp = (d: Date) => {
    const yyyy = `${d.getFullYear()}`;
    const mm = `${d.getMonth() + 1}`.padStart(2, '0');
    const dd = `${d.getDate()}`.padStart(2, '0');

    const dateVal = `${yyyy}-${mm}-${dd}`;
    return dateVal;
};

const minTime = (d: Date) => extractDate(d);

const tomorrowDate = (d: Date) => {
  const date = extractDate(d);
  const tomorrowMillis = date.getTime() + 24 * 60 * 60 * 1000;

  return new Date(tomorrowMillis);
};

const maxTime = (d: Date) => {
  const td = tomorrowDate(d);
  return new Date(td.getTime() - 1);
};

const toDateTimeString = (d: Date): string => {
  return d.toISOString();
};

const waitFor = (promise: Promise<any>) => ((async () => await promise)());

type asyncFn = () => Promise<any>;
const runAsync = (func: asyncFn) => { waitFor(func()); };

export default {
  compareDates,
  dateAddDays,
  tomorrowDate,
  toDateTimeString,
  extractDate,
  toShortDate,
  toDateStamp,
  currentDate,
  minTime,
  maxTime,
  waitFor,
  runAsync,
};
