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

export const getAnalyticsByWeekly = async() => {
  const response = await getApiWrapper(`${base_url}/analytics/last_seven_weeks`);
  console.log('getAllOrganisations', response);
  return response;
};

export const getAnalyticsByMonth = async() => {
    const response = await getApiWrapper(`${base_url}/analytics/monthly?month=09&year=2024`);
    console.log('getAllOrganisations', response);
    return response;
  };

export const getAnalyticsLastSevenDays= async() => {
    const response = await getApiWrapper(`${base_url}/analytics/last_seven_days`);
    console.log('getAllOrganisations', response);
    return response;
  };
