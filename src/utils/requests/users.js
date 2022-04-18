/**
 * USERS REQUESTS
 */

 import {USERS_URL} from '../apiUrl'
 import Axios from './axiosSetup';

 
 export function Register(formData) {
  return Axios.post(`${USERS_URL}/registration`, formData);
 }

 export function GetAll() {
   return Axios.get(USERS_URL);
 }

 export function GetOne(params) {
  return Axios.get(`${USERS_URL}/${params}`);
 }