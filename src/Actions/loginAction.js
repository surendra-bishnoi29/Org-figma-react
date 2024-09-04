import { deleteApiWrapper, getApiWrapper, postApiWrapper, putApiWrapper } from "./token-wrapper-function";

const base_url = 'http://127.0.0.1:4320'

export const loginUser = async (credentials) => {
    const response = await postApiWrapper(`${base_url}/org-admin-login`, credentials);
    return response;
}