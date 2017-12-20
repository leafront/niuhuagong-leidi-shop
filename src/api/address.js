import request from '@/widget/request'

export const getUserAddressList = (data) => request('/api/address/get_user_addr',data)

export const editUserAddress = (data) => request('/api/address/add_user_addr',data)

export const getUserAddress = (data) => request('/api/address/get_address_detail',data)

