import request from '@/widget/request'

export const getInvoiceBillingList = (data) => request('/api/shop/invoice/billingList',data)

export const invoiceBillingSubmit = (data) => request('/api/shop/invoice/billingSubmit',data)

export const getInvoiceHistoryList = (data) =>  request('/api/shop/invoice/historyList',data)

export const getInvoiceHistoryDetail = (data) =>  request('/api/shop/invoice/historyDetail',data)

export const getInvoiceAddressList = (data) => request('/api/shop/invoice/addressList',data)

export const invoiceInfoAdd = (data) => request('/api/shop/invoice/shopInvoiceInfo',data)

export const getInvoiceDetail = (data) => request('/api/shop/invoice/shopInvoiceInfo',data)

export const invoiceInfoEdit = (data) => request('/api/shop/invoice/shopInvoiceEdit',data)

export const invoiceInfoDelete = (data) => request('/api/shop/invoice/shopInvoiceDelete',data)

export const applyInvoice= (data) => request('/api/shop/invoice/applyInvoice',data)

export const invoiceInfo = (data) => request('/api/shop/invoice/getApplyInvoiceInfo',data)

export const invoiceApplyStatus = (data) => request('/api/shop/invoice/applyStatus',data)





