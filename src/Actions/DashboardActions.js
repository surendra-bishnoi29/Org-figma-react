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

export const getAnalyticsByWeekly = async() => {
  const response = await getApiWrapper(`${base_url}/analytics/last_seven_weeks`);
  console.log('getAnalyticsByWeekly', response);
  return response;
};

export const getAnalyticsByMonth = async(month, year) => {
    const response = await getApiWrapper(`${base_url}/analytics/monthly?month=${month}&year=${year}`);
    console.log('getAnalyticsByMonth', response);
    return response;
  };

export const getAnalyticsLastSevenDays= async() => {
    const response = await getApiWrapper(`${base_url}/analytics/last_seven_days`);
    console.log('getAnalyticsLastSevenDays', response);
    return response;
  };

  export const getLinkHistory= async() => {
    const response = await getApiWrapper(`${base_url}/api/links`);
    console.log('getLinkHistory', response);
    return response;
  };

  export const getLinkHistoryById= async(id) => {
    const response = await getApiWrapper(`${base_url}/api/links/${id}`);
    console.log('getLinkHistoryById', response);
    return response;
  };

  export const modifyLinkById= async(id, data) => {
    const response = await putApiWrapper(`${base_url}/api/links/${id}/modify-status`, data);
    console.log('modifyLinkById', response);
    return response;
  };


  export const deleteLinkById= async(id) => {
    const response = await deleteApiWrapper(`${base_url}/api/links/${id}`);
    console.log('deleteLinkById', response);
    return response;
  };


  export const getLinkHistoryByMonth= async(month, year) => {
    const response = await getApiWrapper(`${base_url}/links/monthly?month=${month}&year=${year}`);
   
    return response;
  };


  export const getSession = async (link) =>{
    const response = await postApiWrapper(`${base_url}/create-session`, link);
    
    return response;
  }


  export const getRemoteBrowserCounts = async () =>{
    const response = await getApiWrapper(`${base_url}/analytics/remote-browser`);
    
    return response;
  }
  