import {API} from '../Api';

export async function get_mainCategories_detail() {
  const res = await API.get('Home/get-mainCategories-detail');
  return res.data.data;
}

export async function get_papular_products() {
  const res = await API.get('Home/get-papular-products');
  return res.data.data;
}
