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

const getSocialInteractions = 
async (limit: number = 0, offset: number = 0, sortBy: string[] = []): Promise<ISocialInteractionData[]> => {
    const result = await axios.get('/social-interactions');
    if(result.status === 200) {
      return result.data as ISocialInteractionData[];
    }

    throw new Error('Unable to fetch social interactions.');
};

const getVisitedPlaces = 
async (limit: number = 0, offset: number = 0, sortBy: string[] = []): Promise<IVisitedPlaceData[]> => {
    const result = await axios.get('/visited-places');
    if(result.status === 200) {
      return result.data as IVisitedPlaceData[];
    }

    throw new Error('Unable to fetch visited places.');
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
  getVisitedPlaces,
  postSocialInteraction,
  postVisitedPlace,
};

