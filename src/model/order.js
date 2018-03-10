import request from '@/widget/request'

export const getCartInfo = (data) => request('/api/shop/order/getCartProds',data)

export const getUserOrder = (data) => request('/api/shop/order/getOrderList',data)

export const getOrderInfo = (data) => request('/api/shop/order/getSimpleProd',data)

export const getDefaultAddress = (data) => request('/api/address/get_default_address',data)

export const createQuickOrder = (data) => request('/api/shop/order/createQuickOrder',data)

export const identifying_code = (data) => request('/api/shop/order/identifying_code',data)

export const createOrder = (data) => request('/api/shop/order/createorder',data)

export const getOrderDetail = (data) => request('/api/shop/order/getOrderInfo',data)

export const cancelUserOrder = (data) => request('/api/shop/order/cancelOrder',data)

export const orderLogistics = (data) => request('/api/kuaidi100/logistics',data)

export const orderReceipt = (data) => request('/api/shop/order/receipt',data)