/**
 * MESSAGES REQUESTS
 */

 import {MESSAGES_URL} from '../apiUrl'
 import Axios from './axiosSetup';

 
 export function NewMessage(formData) {
  return Axios.post(MESSAGES_URL, formData);
 }

 export function GetAll() {
   return Axios.get(MESSAGES_URL);
 }

 export function GetOne(params) {
  return Axios.get(`${MESSAGES_URL}/${params}`);
 }