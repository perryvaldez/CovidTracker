import { Reducer } from "redux";

export interface IDefaultAppState {
    stateName: string;
};

export interface IDefaultAppAction {
    type: string;
    payload: object;
};

export const StartState: IDefaultAppState = {
    stateName: 'START',
};

const defaultReducer: Reducer<IDefaultAppState, IDefaultAppAction> = (state = StartState, action) => state;

export default defaultReducer;
