import React, { createContext, useReducer } from 'react';
import { UserReducer } from './userReducer';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userStore, dispatch] = useReducer(UserReducer, {
        userInfos: undefined,
        authToken: undefined,
        isAuthorized: false
    });

    return (
        <UserContext.Provider value={{ userStore, dispatch }}>
            {children}
        </UserContext.Provider>
    );
};

export const ActionTypes = {
    login: 'Login',
    logout: 'Logout',
    register: 'Register',
    userLoaded: 'UserLoaded',
};
