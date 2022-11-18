import { RootState } from '../types/index';

export const getMessages = (store: RootState) => store.wsReducer.messages || [];
export const getUser = (store: RootState) => store.userReducer.userAuthProfile;