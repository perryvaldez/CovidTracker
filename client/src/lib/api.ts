import axios from 'axios';
import config from '../config.json';

export interface ISocialInteractionData {
  _id?: string;
  isSocialDistancing: boolean;
  name: string;
  date: string;
  hours: number;
};

export interface IVisitedPlaceData {
  _id?: string;
  isCrowded: boolean;
  place: string;
  date: string;
  hours: number;
};

axios.defaults.baseURL = config.apiBaseUrl;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';
axios.defaults.headers.patch['Content-Type'] = 'application/json';
axios.defaults.headers.delete['Content-Type'] = 'application/json';

export type FilterType = {
  [key: string]: any,
  from?: string,
  to?: string,
};

const makeQueryParams = (filter: FilterType) => {
  const uparms = new URLSearchParams();

  for(let key in filter) {
    uparms.append(key, filter[key]);
  }

  let qs = uparms.toString();
  if(qs) {
    qs = `?${qs}`;
  }

  return qs;
};

const getSocialInteractions = 
async (filter: FilterType = {}, limit: number = 0, offset: number = 0, sortBy: string[] = []): Promise<ISocialInteractionData[]> => {
    const params = makeQueryParams(filter);
    const result = await axios.get(`/social-interactions${params}`);
    if(result.status === 200) {
      return result.data as ISocialInteractionData[];
    }

    throw new Error('Unable to fetch social interactions.');
};

const countSocialInteractions = 
async (filter: FilterType = {}): Promise<number> => {
    const params = makeQueryParams(filter);
    const result = await axios.get(`/social-interactions/count${params}`);
    if(result.status === 200) {
      return result.data as number;
    }

    throw new Error('Unable to count social interactions.');
};

const getVisitedPlaces = 
async (filter: FilterType = {}, limit: number = 0, offset: number = 0, sortBy: string[] = []): Promise<IVisitedPlaceData[]> => {
    const params = makeQueryParams(filter);
    const result = await axios.get(`/visited-places${params}`);
    if(result.status === 200) {
      return result.data as IVisitedPlaceData[];
    }

    throw new Error('Unable to fetch visited places.');
};

const countVisitedPlaces = 
async (filter: FilterType = {}): Promise<number> => {
    const params = makeQueryParams(filter);
    const result = await axios.get(`/visited-places/count${params}`);
    if(result.status === 200) {
      return result.data as number;
    }

    throw new Error('Unable to count visited places.');
};

const postSocialInteraction = 
async (data: ISocialInteractionData): Promise<string> => {
    const result = await axios.post('/social-interactions', data);
    if(result.status >= 200) {
        return result.data._id;
    }

    throw new Error('Unable to post social interaction.');
};

const postVisitedPlace = 
async (data: IVisitedPlaceData): Promise<string> => {
    const result = await axios.post('/visited-places', data);
    if(result.status >= 200) {
        return result.data._id;
    }

    throw new Error('Unable to post visited place.');
};

export default {
  getSocialInteractions,
  countSocialInteractions,
  getVisitedPlaces,
  countVisitedPlaces,
  postSocialInteraction,
  postVisitedPlace,
};

