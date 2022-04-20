/**
 * SERVICES REQUESTS
 */

 import {SERVICES_URL} from '../apiUrl'
 import Axios from './axiosSetup';

 export function GetActiveServices() {
   return Axios.get(`${SERVICES_URL}/active`);
 }

 export function GetAllServices() {
  return Axios.get(SERVICES_URL);
}

 export function GetOne(params) {
  return Axios.get(`${SERVICES_URL}/${params}`);
 }

 export function UpdateService(params, formData) {
  return Axios.put(`${SERVICES_URL}/${params}`, formData);
 }
 
 export function AddServices(formData) {
  return Axios.post(`${SERVICES_URL}`, formData);
 }