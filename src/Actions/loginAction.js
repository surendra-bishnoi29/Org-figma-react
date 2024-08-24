import { deleteApiWrapper, getApiWrapper, postApiWrapper, putApiWrapper } from "./token-wrapper-function";

const base_url = 'http://34.18.95.25'

export const loginUser = async (credentials) => {
    const response = await postApiWrapper(`${base_url}/login`, credentials);
    return response;
}