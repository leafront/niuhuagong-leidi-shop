import request from '@/widget/request'

export const getUserAssets = (data) => request('/api/shop/bonus/getSumBonus',data)

export const getIncomeList = (data) => request('/api/shop/bonus/getWithDrawDetails',data)

export const submitCash = (data) => request('/api/shop/bonus/withdraw',data)

export const userAuthStore = (data) => request('/api/shop/Approve/approve_store',data)

