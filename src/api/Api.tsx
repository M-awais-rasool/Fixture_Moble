import axios from 'axios';

export const APIURl = 'https://fixturesmobel.com:446/Api/';

export const API = axios.create({
  baseURL: APIURl,
  timeout: 60000,
});

API.interceptors.request.use(
  async function (_config: any) {
    _config.headers['Content-Type'] = 'application/json';
    _config.headers['tenant'] = 'development';

    return _config;
  },
  function (error: any) {
    console.log('API ERROR :: ' + JSON.stringify(error));
  },
);

// API.interceptors.response.use(function (response: any) {
//   return response;
// });
