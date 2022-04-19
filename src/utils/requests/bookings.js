/**
 * MESSAGES REQUESTS
 */

 import {BOOKINGS_URL} from '../apiUrl'
 import Axios from './axiosSetup';

 
 export function NewBooking(formData) {
  return Axios.post(BOOKINGS_URL, formData);
 }

 export function GetAll() {
   return Axios.get(BOOKINGS_URL);
 }

 export function GetOne(params) {
  return Axios.get(`${BOOKINGS_URL}/${params}`);
 }