import { ISocialInteractionData, IVisitedPlaceData } from "./api";
import utils from '../lib/utils';

export type DataItem = {
  date: string,
  count: number,
};

export type ChartProps = {
  data: DataItem[],
};

type DateCountEntryType = {[key: string]: any};
const extractData = (arr: ISocialInteractionData[] | IVisitedPlaceData[] = []): DataItem[] => {
  const entries: DateCountEntryType = {};

  for(let i in arr) {
    const d = utils.extractDate(new Date(arr[i].date)).toISOString();

    if(!entries[d]) {
      entries[d] = 0;
    }

    ++entries[d];
  }

  const keys = Object.keys(entries);
  keys.sort();
  
  const result = keys.map((key) => ({ date: utils.toShortDate(new Date(key)), count: entries[key]}));

  return result;
};

export default {
  extractData,
};