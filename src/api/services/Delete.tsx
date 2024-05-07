import { API } from "../Api";

export const remove_to_WishList = async (id: any) => {
    const res: any = await API.delete(`WishList/remove-from-WishList/${id}`);
    return res;
  };

  export const remove_to_cart = async (id: any) => {
    const res: any = await API.delete(`Cart/delete-product-from-cart/${id}`);
    return res;
  };