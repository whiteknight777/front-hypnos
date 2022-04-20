/**
 * FACILITIES REQUESTS
 */

 import {FACILITIES_URL} from '../apiUrl'
 import Axios from './axiosSetup';

 export function GetActiveFacilities() {
   return Axios.get(`${FACILITIES_URL}/active`);
 }

 export function GetAllFacilities() {
  return Axios.get(FACILITIES_URL);
}

 export function GetOne(params) {
  return Axios.get(`${FACILITIES_URL}/${params}`);
 }

 export function GetGerantFacility(params) {
  return Axios.get(`${FACILITIES_URL}/gerant/${params}`);
 }

 export function UpdateFacility(params, formData) {
  return Axios.put(`${FACILITIES_URL}/${params}`, formData);
 }
 
 export function AddFacility(formData) {
  return Axios.post(`${FACILITIES_URL}`, formData);
 }