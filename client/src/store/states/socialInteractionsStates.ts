const socialInteractionsStates = {
  START: 'SOCIAL_INTERACTIONS_START',
  READY: 'SOCIAL_INTERACTIONS_READY',
  OUTDATED_DATA: 'SOCIAL_INTERACTIONS_OUTDATED_DATA',
};

export interface ISocialInteractionsPayload {
  data: any[];
  totalCount: number;
};

export interface ISocialInteractionsState {
  stateName: string;
  payload: ISocialInteractionsPayload;
};

export const SocialInteractionsStartState: ISocialInteractionsState = {
  stateName: socialInteractionsStates.START,
  payload: {
    data: [],
    totalCount: 0,
  },
};

export default socialInteractionsStates;