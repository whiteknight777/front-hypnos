/**
 * MEDIAS REQUESTS
 */

 import {MEDIAS_URL} from '../apiUrl'
 import Axios from './axiosSetup';

 
 export function NewMessage(formData) {
  return Axios.post(MEDIAS_URL, formData);
 }

 export function GetAllMessags() {
   return Axios.get(MEDIAS_URL);
 }

 export function GetOne(params) {
  return Axios.get(`${MEDIAS_URL}/${params}`);
 }

 export function SendMedias(params, formData) {
  // return Axios.post(`${MEDIAS_URL}`, formData);
  return Axios({
    method: "post",
    url: `${MEDIAS_URL}/${params}`,
    data: formData,
    headers: {
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'multipart/form-data;'
    },
  })
 }