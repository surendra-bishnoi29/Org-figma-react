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

const base_url = 'http://34.18.95.25'

export const getOrgInfo = async() => {
  const response = await getApiWrapper(`${base_url}/api/org-info`);
  console.log('getAnalyticsByWeekly', response);
  return response;
};

