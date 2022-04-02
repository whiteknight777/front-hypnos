import { ActionTypes } from './userProvider';

export const UserReducer = (state, action) => {
    const userInfos = action.payload?.userInfos;
    switch (action.type) {
        // LOGIN ACTION
        case ActionTypes.login:
            sessionStorage.setItem('accessToken', action.accessToken);
            return { userInfos: undefined, isAuthorized: false, accessToken: action.accessToken };
        // REGISTER ACTION
        case ActionTypes.register:
            return { userInfos: undefined };
        // LOGOUT ACTION
        case ActionTypes.logout:
            sessionStorage.removeItem('accessToken');
            return { userInfos: undefined, isAuthorized: false, accessToken: undefined };
        // LOAD USER ACTION
        case ActionTypes.userLoaded:
            return { ...state, userInfos, isAuthorized: true };
        // SET USER ACTION
        case ActionTypes.setUser:
            return { ...state, userInfos };
        // DEFAULT ACTION
        default:
            return state;
    }
};
