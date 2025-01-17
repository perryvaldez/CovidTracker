import { ISocialInteractionData, IVisitedPlaceData } from "./api";
import utils from '../lib/utils';

export type DataItem = {
  date: string,
  count: number,
};

export type ChartProps = {
  data: DataItem[],
  width: number,
  height: number,
};

type DateCountEntryType = {[key: string]: any};
const extractData = (arr: ISocialInteractionData[] | IVisitedPlaceData[] = [], lastDays: number): DataItem[] => {
  const entries: DateCountEntryType = {};
  const currentDate = utils.currentDate();

  for(let days = 0; days < lastDays; days += 1) {
    const date = utils.extractDate(utils.dateAddDays(currentDate, -days)).toISOString();
    entries[date] = 0;
  }

  for(let i in arr) {
    const d = utils.extractDate(new Date(arr[i].date)).toISOString();

    if(typeof(entries[d]) === 'number') {
      ++entries[d];
    }
  }

  const keys = Object.keys(entries);
  keys.sort();
  
  const result = keys.map((key) => ({ date: utils.toShortDate(new Date(key)), count: entries[key]}));

  return result;
};

export default {
  extractData,
};