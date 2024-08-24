import helpers from './commonAction';

export const getApiWrapper = async (url) => {
  const Token = window.localStorage.getItem('Token') ? window.localStorage.getItem('Token') : {};
  if (Token) {
    const result = await helpers.httpGet(url, Token);
    return result;
  }
};

export const postApiWrapper = async (url, data) => {
  const Token = window.localStorage.getItem('Token') ? window.localStorage.getItem('Token') : {};
  if (Token) {
    const result = await helpers.httpPost(url, data, Token);
    return result;
  }
};

export const deleteApiWrapper = async (url) => {
  const Token = window.localStorage.getItem('Token') ? window.localStorage.getItem('Token') : {};
  if (Token) {
    const result = await helpers.httpDelete(url, Token);
    return result;
  }
};

export const putApiWrapper = async (url, data) => {
  const Token = window.localStorage.getItem('Token') ? window.localStorage.getItem('Token') : {};
  if (Token) {
    const result = await helpers.httpPut(url, data, Token);
    return result;
  }
}