
import request from '@/widget/request'

export const getProductDetail = (data) => request('https://m.lechebang.com/gateway/home/getMtnData',data);