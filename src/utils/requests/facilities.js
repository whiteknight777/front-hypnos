/**
 * FACILITIES REQUESTS
 */

 import {FACILITIES_URL} from '../apiUrl'
 import Axios from './axiosSetup';

 export function GetAll() {
   return Axios.get(FACILITIES_URL);
 }

 export function GetOne(params) {
  return Axios.get(`${FACILITIES_URL}/${params}`);
 }