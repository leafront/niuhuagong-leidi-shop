
import request from '@/widget/request'

export const addCart = (data) => request('/api/shop/product/getProduct',data);
