import { deleteApiWrapper, getApiWrapper, postApiWrapper, putApiWrapper } from "./token-wrapper-function";
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
/**
 * Retrieves data of users.
 * @returns {Array} An array of user objects.
 */


/**
 * Retrieves all users.
 * @returns {Array} An array of user objects.
 */

const base_url = 'http://127.0.0.1:4320'

export const getAllUsers = async() => {
  const response = await getApiWrapper(`${base_url}/api/users`);
  console.log('getAllUsers', response);
  return response;
};



export const createUser = (user) => {
  const response = postApiWrapper(`${base_url}/users/create-user`, user);
  console.log('createUser', response);
  return response;
}

export const updateUser = (id, user) => {
  const response = putApiWrapper(`${base_url}/api/users/${id}`, user);
  return response;
} 

export const deleteUser = (id) => {
  const response = deleteApiWrapper(`${base_url}/api/users/${id}`);
  return response;
}


export const getUserById = (id) =>{
  const response = getApiWrapper(`${base_url}/api/users/${id}`);
  return response;
}

export const getCurrentUser = async() => {
  // const response = await getApiWrapper(`${base_url}/get-current-user`);
  // return response;
}