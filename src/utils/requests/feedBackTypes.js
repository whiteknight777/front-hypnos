/**
 * FEEDBACKTYPES REQUESTS
 */

 import {FEEDBACKTYPES_URL} from '../apiUrl'
 import Axios from './axiosSetup';

 export function GetAll() {
   return Axios.get(FEEDBACKTYPES_URL);
 }

 export function GetOne(params) {
  return Axios.get(`${FEEDBACKTYPES_URL}/${params}`);
 }