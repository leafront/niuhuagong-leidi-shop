import request from '@/widget/request'

export const getProductDetail = (data) => request('/api/shop/product/getProduct',data)

export const addShopCart = (data) => request('/api/shop/shopcart/addProdToCart',data)

export const getCartCount = (data) => request('/api/shop/shopcart/getCartCnt',data)


