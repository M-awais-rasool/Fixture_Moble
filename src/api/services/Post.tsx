import {API} from '../Api';

export const Login = async (data: any) => {
  const res: any = await API.post('Authenticate/login', data);
  return res;
};

export const userCreate = async (data: any) => {
  const res: any = await API.post('Authenticate/Register', data);
  return res;
};
export const add_to_WishList = async (id: any) => {
  const res: any = await API.post(`WishList/add-to-WishList/${id}`);
  return res;
};

export const add_to_Cart = async (id: any, Q: any) => {
  const res: any = await API.post(
    `Cart/add-product-to-cart/${id}?productQuantity=${Q}`,
  );
  return res;
};

export const add_to_Cart_Quantity = async (id: any) => {
  const res: any = await API.post(`Cart/add-to-cart/${id}`);
  return res;
};

export const add_new_shipping_address = async (data: any) => {
  const res: any = await API.post(
    'ShippingAddress/add-new-shipping-address',
    data,
  );
  return res;
};
