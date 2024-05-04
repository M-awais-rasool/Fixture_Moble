import {API} from '../Api';

export const Login = async (data: any) => {
  const res: any = API.post('Authenticate/login', data);
  return res;
};

export const padd_to_WishList = async (id: any) => {
  const res: any = API.post(`WishList/add-to-WishList/${id}`);
  return res;
};
