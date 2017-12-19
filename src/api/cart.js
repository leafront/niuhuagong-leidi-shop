
import request from '@/widget/request'

export const getCartList = (data) => request('/api/shop/shopcart/getShopCartList',data)

export const changeNumCart = (data) => request('/api/shop/shopcart/changeProdNum',data)

export const checkCartProd = (data) => request('/api/shop/shopcart/checkCartProd',data)



