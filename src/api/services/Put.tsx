import {API} from '../Api';

export const remove_to_cartQuantity = async (id: any) => {
  const res: any = await API.put(`Cart/remove-from-cart/${id}`);
  return res;
};
