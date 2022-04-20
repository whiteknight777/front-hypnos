/**
 * USERS REQUESTS
 */

 import {USERS_URL} from '../apiUrl'
 import Axios from './axiosSetup';

 
 export function Register(formData) {
  return Axios.post(`${USERS_URL}/registration`, formData);
 }

 export function UpdateUser(params, formData) {
  return Axios.put(`${USERS_URL}/${params}`, formData);
 }

 export function GetActiveUsers() {
  return Axios.get(`${USERS_URL}/active`);
}

 export function GetAllUser() {
   return Axios.get(USERS_URL);
 }

 export function GetGerants() {
  return Axios.get(`${USERS_URL}/gerants`);
 }

 export function GetOne(params) {
  return Axios.get(`${USERS_URL}/${params}`);
 }