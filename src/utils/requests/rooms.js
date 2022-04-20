/**
 * ROOMS REQUESTS
 */

 import {ROOMS_URL} from '../apiUrl'
 import Axios from './axiosSetup';

 export function GetActiveRooms() {
   return Axios.get(`${ROOMS_URL}/active`);
 }

 export function GetAllRooms() {
  return Axios.get(ROOMS_URL);
}

 export function GetOne(params) {
  return Axios.get(`${ROOMS_URL}/${params}`);
 }

 export function GetFacilityRooms(params) {
  return Axios.get(`${ROOMS_URL}/facility/${params}`);
 }

 export function UpdateRoom(params, formData) {
  return Axios.put(`${ROOMS_URL}/${params}`, formData);
 }
 
 export function AddRoom(formData) {
  return Axios.post(`${ROOMS_URL}`, formData);
 }
 
 export function AddRoomServices(formData) {
  return Axios.post(`${ROOMS_URL}/services`, formData);
 }

 export function DeleteRoomServices(formData) {
  return Axios.post(`${ROOMS_URL}/remove/services`, formData);
 }