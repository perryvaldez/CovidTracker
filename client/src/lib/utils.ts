const compareDates = (a: Date, b: Date): number => {
  return (a.getTime() - b.getTime());
};

const tomorrowDate = () => {
  const date = new Date(); // Current date and time
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);

  const tomorrowMillis = date.getTime() + 24 * 60 * 60 * 1000;

  return new Date(tomorrowMillis);
};

export default {
  compareDates,
  tomorrowDate,
};
