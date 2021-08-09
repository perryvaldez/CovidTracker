const compareDates = (a: Date, b: Date): number => {
  return (a.getTime() - b.getTime());
};

const extractDate = (d: Date): Date => new Date(d.getFullYear(), d.getMonth(), d.getDate());

const currentDate = (): Date => extractDate(new Date());

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

export default {
  compareDates,
  tomorrowDate,
  toDateTimeString,
  extractDate,
  currentDate,
  minTime,
  maxTime,
};
