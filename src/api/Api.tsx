import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import NetInfo from '@react-native-community/netinfo';
import {Platform} from 'react-native';

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
    console.log(JSON.stringify(error.response));

    if (errors === '401') {
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
    } else if (errors == '500') {
      const res = {
        ...error,
        data: {status: 500, message: messg},
      };
      return res;
    }
  },
);
export const isNetworkAvailable = async () => {
  let response: any = false;
  await NetInfo.fetch().then(networkState => {
    response = networkState.isConnected && networkState.isInternetReachable;
  });
  return response;
};
export const checkPermission = async (item: string) => {
  let finalData: any;
  if (item === 'camera') {
    let response: any;
    if (Platform.OS === 'android') {
      response = await check(PERMISSIONS.ANDROID.CAMERA)
        .then(async result => {
          let data: any;
          console.log(JSON.stringify(result));
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
    } else if (Platform.OS === 'ios') {
      response = await check(PERMISSIONS.IOS.CAMERA)
        .then(async result => {
          let data: any;
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
    }
    finalData = response;
    return response;
  } else if (item === 'gallery') {
    let response: any;
    if (Platform.OS === 'android') {
      response = await check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE)
        .then(async result => {
          let data: any;
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
    } else if (Platform.OS === 'ios') {
      response = await check(PERMISSIONS.IOS.PHOTO_LIBRARY)
        .then(async result => {
          let data: any;
          switch (result) {
            case RESULTS.UNAVAILABLE:
              data = await permissionRequest(item);
              break;
            case RESULTS.LIMITED:
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
    }
    finalData = response;
    return response;
  } else if (item === 'location') {
    let response: any;
    if (Platform.OS === 'android') {
      response = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
        .then(async result => {
          let data: any;
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
    } else if (Platform.OS === 'ios') {
      response = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
        .then(async result => {
          let data: any;
          switch (result) {
            case RESULTS.UNAVAILABLE:
              data = await permissionRequest(item);
              break;
            case RESULTS.LIMITED:
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
    }
    finalData = response;
    return response;
  }
  return finalData;
};

const permissionRequest = async (item: string) => {
  let finalData: any;
  if (item === 'camera') {
    let response: any;
    if (Platform.OS === 'android') {
      response = await request(PERMISSIONS.ANDROID.CAMERA).then(result => {
        let data: any;
        console.log(JSON.stringify(result));
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
    } else if (Platform.OS === 'ios') {
      response = await request(PERMISSIONS.IOS.CAMERA).then(result => {
        let data: any;
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
    }
    finalData = response;
    return response;
  } else if (item === 'gallery') {
    let response: any;
    if (Platform.OS === 'android') {
      response = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then(
        result => {
          let data: any;
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
    } else if (Platform.OS === 'ios') {
      response = await request(PERMISSIONS.IOS.PHOTO_LIBRARY).then(result => {
        let data: any;
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
    }
    finalData = response;
    return response;
  } else if (item === 'location') {
    let response: any;
    if (Platform.OS === 'android') {
      response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(
        result => {
          let data: any;
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
    } else if (Platform.OS === 'ios') {
      response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then(
        result => {
          let data: any;
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
    }
    finalData = response;
    return response;
  }
  return finalData;
};