import AsyncStorage from '@react-native-async-storage/async-storage';
import {API} from '../Api';

export const remove_to_cartQuantity = async (id: any) => {
  const res: any = await API.put(`Cart/remove-from-cart/${id}`);
  return res;
};

export const update_shipping_Address = async (id: any) => {
  const res: any = await API.put(
    `ShippingAddress/update-shipping-Address-status/${id}`,
  );
  return res;
};

// export const user_Profile_Update = async (data: any) => {
//   const res: any = await API.put('User/update-user-profile',data );
//   return res;
// };

export const user_Profile_Update = async (data: any) => {
  try {
    let token = await AsyncStorage.getItem('token');
    const response = await fetch(
      'https://fixturesmobel.com:446/Api/User/update-user-profile',
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          tenant: 'development',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        body: data,
      },
    );
    const json = await response.json();
    return json;
  } catch (error) {
    console.warn(error);
  }
};
