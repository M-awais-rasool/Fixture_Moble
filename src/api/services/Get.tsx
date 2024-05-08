import {API} from '../Api';

export async function get_mainCategories_detail() {
  const res = await API.get('Home/get-mainCategories-detail');
  return res.data.data;
}

export async function get_papular_products() {
  const res = await API.get('Home/get-papular-products');
  return res.data.data;
}

export async function get_onSale_products() {
  const res = await API.get('Home/get-onsale-products');
  return res.data.data;
}

export async function get_testimonial() {
  const res = await API.get('Home/get-testimonials');
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

export async function get_products_quantity() {
  const res = await API.get('Cart/get-user-products-quantity');
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

export async function get_cart_products() {
  const res = await API.get('Cart/get-user-Cart-products');
  return res.data.data;
}

export async function getUserData() {
  const res = await API.get('User/get-user-profile');
  return res.data.data;
}

export async function get_Shipping_address() {
  const res = await API.get('ShippingAddress/get-Shipping-address');
  return res.data.data;
}

export async function get_default_Shipping_address() {
  const res = await API.get('ShippingAddress/get-user-default-Shipping-address');
  return res.data.data;
}


export async function get_product_order_summary(id:any ,Q:any) {
  const res = await API.get(`Home/get-product-order-summary/${id}?quantity=${Q}`);
  return res.data.data;
}
