
import request from '@/widget/request'

export const getProductList = (data) => request('/api/shop/product/productList',data);