import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';

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
    console.log(messg)

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

export const askPermision = async (item: any) => {
  if (item === 'camera') {
    let response;
    response = await check(PERMISSIONS.ANDROID.CAMERA)
      .then(async result => {
        let data;
        switch (result) {
          case RESULTS.UNAVAILABLE:
            data = await permissionRequest(item);
            break;
          case RESULTS.DENIED:
            data = await permissionRequest(item);
            break;
          case RESULTS.GRANTED:
            data = {
              result: true,
              permission: 'GRANTED',
            };
            break;
          case RESULTS.BLOCKED:
            data = await permissionRequest(item);
            break;
        }
        return data;
      })
      .catch(async _error => {
        return await permissionRequest(item);
      });
    return response;
  } else if (item === 'gallery') {
    let response;
    response = await check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE)
      .then(async result => {
        let data;
        switch (result) {
          case RESULTS.UNAVAILABLE:
            data = await permissionRequest(item);
            break;
          case RESULTS.DENIED:
            data = await permissionRequest(item);
            break;
          case RESULTS.GRANTED:
            data = {
              result: true,
              permission: 'GRANTED',
            };
            break;
          case RESULTS.BLOCKED:
            data = await permissionRequest(item);
            break;
        }
        return data;
      })
      .catch(async _error => {
        return await permissionRequest(item);
      });

    return response;
  }
};

const permissionRequest = async (item: any) => {
  if (item === 'camera') {
    let response;
    response = await request(PERMISSIONS.ANDROID.CAMERA).then(result => {
      let data;
      switch (result) {
        case RESULTS.UNAVAILABLE:
          data = {
            result: false,
            permission: 'UNAVAILABLE',
          };
          break;
        case RESULTS.DENIED:
          data = {
            result: false,
            permission: 'DENIED',
          };
          break;
        case RESULTS.LIMITED:
          data = {
            result: false,
            permission: 'LIMITED',
          };
          break;
        case RESULTS.GRANTED:
          data = {
            result: true,
            permission: 'GRANTED',
          };
          break;
        case RESULTS.BLOCKED:
          data = {
            result: false,
            permission: 'BLOCKED',
          };
          break;
      }
      return data;
    });
    return response;
  } else if (item === 'gallery') {
    let response;
    response = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then(
      result => {
        let data;
        switch (result) {
          case RESULTS.UNAVAILABLE:
            data = {
              result: false,
              permission: 'UNAVAILABLE',
            };
            break;
          case RESULTS.DENIED:
            data = {
              result: false,
              permission: 'DENIED',
            };
            break;
          case RESULTS.LIMITED:
            data = {
              result: false,
              permission: 'LIMITED',
            };
            break;
          case RESULTS.GRANTED:
            data = {
              result: true,
              permission: 'GRANTED',
            };
            break;
          case RESULTS.BLOCKED:
            data = {
              result: false,
              permission: 'BLOCKED',
            };
            break;
        }
        return data;
      },
    );
    return response;
  }
};
