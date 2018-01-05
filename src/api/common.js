
import request from '@/widget/request'

export const addCart = (data) => request('/api/shop/product/getProduct',data);

export const areaCity = (data) => request('/static/data/areaCity.js',data);

export const getIconFont = (data) => request('/static/fonts/iconfont.js',data);

export const getPayInfo = (data) => request('/api/shop/order/get_order_cost',data)

export const checkPayInfo = (data) => request('/api/shop/pay/queryByOrderId',data)
