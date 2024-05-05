import {API} from '../Api';

export async function get_mainCategories_detail() {
  const res = await API.get('Home/get-mainCategories-detail');
  return res.data.data;
}

export async function get_papular_products() {
  const res = await API.get('Home/get-papular-products');
  return res.data.data;
}
export async function get_category_products(id: any) {
  const res = await API.get(`Home/get-category-products/${id}`);
  return res.data.data;
}

export async function get_SubCategory_products(id: any) {
  const res = await API.get(`Home/get-products/${id}`);
  return res.data.data;
}

export async function get_products(id: any) {
  const res = await API.get(`Home/get-product/${id}`);
  return res.data.data;
}

export async function get_WishLit_products() {
  const res = await API.get('WishList/get-user-WishList-products');
  return res.data.data;
}
