
import request from '@/widget/request'

export const getInvoiceBillingList = (data) => request('/api/shop/invoice/billingList',data)

export const invoiceBillingSubmit = (data) => request('/api/shop/invoice/billingSubmit',data)

export const getInvoiceHistoryList = (data) =>  request('/api/shop/invoice/historyList',data)

export const getInvoiceHistoryDetail = (data) =>  request('/api/shop/invoice/historyDetail',data)

export const getInvoiceAddressList = (data) => request('/api/shop/invoice/addressList',data)

export const invoiceInfoAdd = (data) => request('/api/shop/invoice/shopInvoiceInfo',data)

export const invoiceInfoEdit = (data) => request('/api/shop/invoice/shopInvoiceEdit',data)

export const invoiceInfoDelete = (data) => request('/api/shop/invoice/shopInvoiceDelete',data)

export const invoiceAptitudeAdd= (data) => request('/static/invoice/aptitudeAdd.json',data)

export const invoiceAptitudeInfo= (data) => request('/static/invoice/aptitudeInfo.json',data)

export const invoiceAptitudeSubmit = (data) => request('/static/invoice/aptitudeSubmit',data)

export const invoiceAptitudeEditAddress = (data) => request('/static/invoice/editAptitudeAddress.json',data)

export const invoiceAptitudeEditInvoice = (data) => request('/static/invoice/editAptitudeInvoice.json',data)

export const invoiceAptitudeDelete = (data) => request('/static/invoice/aptitudeDelete.json',data)

export const getInvoiceAptitudeList = (data) => request('/api/shop/invoice/aptitudeAddressList',data)




