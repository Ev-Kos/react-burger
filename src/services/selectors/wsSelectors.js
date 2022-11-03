export const getMessages = (store) => store.wsReducer.messages || [];
export const getUser = (store) => store.userReducer.userAuthProfile;