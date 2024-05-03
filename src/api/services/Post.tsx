import {API} from '../Api';

export const Login = async (data: any) => {
  const res:any = API.post('Authenticate/login', data);
  return res;
};
