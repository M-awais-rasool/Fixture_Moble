import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const APIURl = 'https://fixturesmobel.com:446/Api/';

export const API = axios.create({
  baseURL: APIURl,
  timeout: 60000,
});

API.interceptors.request.use(
  async function (_config: any) {
    let token = await AsyncStorage.getItem('token');
    if (token != null || token != '' || token != undefined) {
      _config.headers.Authorization = 'Bearer ' + token;
    }
    _config.headers['Content-Type'] = 'application/json';
    _config.headers['tenant'] = 'development';

    return _config;
  },
  function (error: any) {
    console.log('API ERROR :: ' + JSON.stringify(error));
  },
);

API.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error: any) {
    let errors = JSON.stringify(error.response.status);
    let messg = JSON.stringify(error.response.data.message);
    if (errors === '401') {
      console.log('API Error');
      const res = {
        ...error,
        data: {status: 401, ...error},
      };
      return res;
    } else if (errors === '400') {
      const res = {
        ...error,
        data: {status: 400, message: messg},
      };
      return res;
    }
  },
);
