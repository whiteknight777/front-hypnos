/**
 * AUTH REQUESTS
 */

 import {LOGIN_URL, LOGOUT_URL, ME_URL} from '../apiUrl'
 import Axios from './axiosSetup';

 export const LoginRequest = async ({ email, password }) => {
    return Axios.post(LOGIN_URL, { email, password });
 }
 
 export const LogoutRequest = async () => {
    return Axios.get(LOGOUT_URL);
 }

 export function GetUserByToken() {
   // Authorization head should be fulfilled in interceptor.
   Axios.defaults.headers.common.Authorization = `Bearer ${sessionStorage.getItem('accessToken')}`;
   return Axios.get(ME_URL);
 }