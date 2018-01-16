import request from '@/widget/request'

export const getProductList = (data) => request('/api/shop/product/getProductList',data)

export const getBannerList = (data) => request('/api/shop/product/getBannerList',data)

