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

export interface IDeleteResult {
  msg: string;
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

const makeQueryParams = (filter: FilterType, limit?: number, offset?: number, sortBy: string[] = []) => {
  const uparms = new URLSearchParams();

  for(let key in filter) {
    uparms.append(key, filter[key]);
  }

  if(typeof(limit) !== 'undefined') {
    uparms.append('limit', `${limit}`);
  }

  if(typeof(offset) !== 'undefined') {
    uparms.append('offset', `${offset}`);
  }

  if(sortBy.length > 0) {
    for(let s in sortBy) {
      uparms.append('sortby', `${sortBy[s]}`);
    }
  }

  let qs = uparms.toString();
  if(qs) {
    qs = `?${qs}`;
  }

  return qs;
};

const getSocialInteractions = 
async (filter: FilterType = {}, limit: number = 0, offset: number = 0, sortBy: string[] = []): Promise<ISocialInteractionData[]> => {
    const params = makeQueryParams(filter, limit, offset, sortBy);
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

const getSocialInteractionsAvailableNames = 
async (prefix: string = ''): Promise<string[]> => {
    const params = `name=name&prefix=${encodeURIComponent(prefix)}`;
    const result = await axios.get(`/social-interactions/field?${params}`);
    if(result.status === 200) {
      return result.data as string[];
    }

    throw new Error('Unable to fetch available social interaction names.');
};

const getVisitedPlaces = 
async (filter: FilterType = {}, limit: number = 0, offset: number = 0, sortBy: string[] = []): Promise<IVisitedPlaceData[]> => {
    const params = makeQueryParams(filter, limit, offset, sortBy);
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

const getVisitedPlacesAvailablePlaces = 
async (prefix: string = ''): Promise<string[]> => {
    const params = `name=place&prefix=${encodeURIComponent(prefix)}`;
    const result = await axios.get(`/visited-places/field?${params}`);
    if(result.status === 200) {
      return result.data as string[];
    }

    throw new Error('Unable to fetch available visited places.');
};

const postSocialInteraction = 
async (data: ISocialInteractionData): Promise<string> => {
    const result = await axios.post('/social-interactions', data);
    if(result.status >= 200) {
        return result.data._id;
    }

    throw new Error('Unable to post social interaction.');
};

const putSocialInteraction = 
async (id: string, data: ISocialInteractionData): Promise<ISocialInteractionData> => {
    const result = await axios.put(`/social-interactions/${id}`, data);
    if(result.status >= 200) {
        return result.data as ISocialInteractionData;
    }

    throw new Error('Unable to update social interaction.');
};

const deleteSocialInteraction = 
async (id: string): Promise<IDeleteResult> => {
    const result = await axios.delete(`/social-interactions/${id}`);
    if(result.status >= 200) {
        return result.data as IDeleteResult;
    }

    throw new Error('Unable to delete social interaction.');
};

const postVisitedPlace = 
async (data: IVisitedPlaceData): Promise<string> => {
    const result = await axios.post('/visited-places', data);
    if(result.status >= 200) {
        return result.data._id;
    }

    throw new Error('Unable to post visited place.');
};

const putVisitedPlace = 
async (id: string, data: IVisitedPlaceData): Promise<IVisitedPlaceData> => {
    const result = await axios.put(`/visited-places/${id}`, data);
    if(result.status >= 200) {
        return result.data as IVisitedPlaceData;
    }

    throw new Error('Unable to update visited place.');
};

const deleteVisitedPlace = 
async (id: string): Promise<IDeleteResult> => {
    const result = await axios.delete(`/visited-places/${id}`);
    if(result.status >= 200) {
        return result.data as IDeleteResult;
    }

    throw new Error('Unable to delete visited place.');
};

export default {
  getSocialInteractions,
  countSocialInteractions,
  getSocialInteractionsAvailableNames,
  getVisitedPlaces,
  countVisitedPlaces,
  getVisitedPlacesAvailablePlaces,
  postSocialInteraction,
  postVisitedPlace,
  putVisitedPlace,
  putSocialInteraction,
  deleteVisitedPlace,
  deleteSocialInteraction,
};

