
import request from '@/widget/request'

export const getProductDetail = (data) => request('/api/shop/product/getProduct',data);
