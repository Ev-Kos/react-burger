import { RootState } from '../types/index';


export const getWsConnected = (state: RootState) => state.wsReducer.wsConnected;