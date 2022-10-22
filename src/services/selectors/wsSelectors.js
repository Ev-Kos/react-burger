export const getMessages = (store) => store.ws.messages || [];
export const getUser = (store) => store.userReducer.userAuthProfile;