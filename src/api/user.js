import request from '@/widget/request'

export const getUserAssets = (data) => request('/api/shop/bonus/getSumBonus',data)

export const getIncomeList = (data) => request('/api/shop/bonus/getWithDrawDetails',data)

export const submitCash = (data) => request('/api/shop/bonus/withdraw',data)

export const userAuthStore = (data) => request('/api/shop/Approve/approve_store',data)

export const userAuthArtisan = (data) =>  request('/api/shop/Approve/Approve_artisan',data)

export const userAuthGuide = (data) => request('/api/shop/Approve/Approve_guide',data)

export const userAuthSendMsg = (data) => request('/api/alisms/send_msg',data)

export const userVerifyCode = (data) => request('/api/alisms/verify_smscode',data)

export const wxOauthLogin = (data) => request('/api/shop/access/wxAuth',data)

export const getUserInfo = (data) => request('/api/user/userinfo',data)

