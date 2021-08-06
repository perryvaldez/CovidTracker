const compareDates = (a: Date, b: Date): number => {
  return (a.getTime() - b.getTime());
};

const extractDate = (d: Date): Date => new Date(d.getFullYear(), d.getMonth(), d.getDate());

const tomorrowDate = () => {
  const date = new Date(); // Current date and time
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);

  const tomorrowMillis = date.getTime() + 24 * 60 * 60 * 1000;

  return new Date(tomorrowMillis);
};

const toDateTimeString = (d: Date): string => {
  return d.toISOString();
};

export default {
  compareDates,
  tomorrowDate,
  toDateTimeString,
  extractDate,
};
