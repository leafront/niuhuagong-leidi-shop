
import request from '@/widget/request'

export const getInvoiceBillingList = (data) => request('/api/shop/invoice/billingList',data)

export const invoiceBillingSubmit = (data) => request('/api/shop/invoice/billingSubmit',data)

export const getInvoiceHistoryList = (data) =>  request('/static/invoice/history/list.json',data)

export const getInvoiceHistoryDetail = (data) =>  request('/static/invoice/history/detail.json',data)

export const getInvoiceAddressList = (data) => request('/static/invoice/addressList.json',data)

export const invoiceInfoAdd = (data) => request('/static/invoice/infoAdd.json',data)

export const invoiceInfoDelete = (data) => request('/static/invoice/infoDelete.json',data)

export const invoiceAptitudeAdd= (data) => request('/static/invoice/aptitudeAdd.json',data)

export const invoiceAptitudeInfo= (data) => request('/static/invoice/aptitudeInfo.json',data)

export const invoiceAptitudeSubmit = (data) => request('/static/invoice/aptitudeSubmit',data)

export const invoiceAptitudeEditAddress = (data) => request('/static/invoice/editAptitudeAddress.json',data)

export const invoiceAptitudeEditInvoice = (data) => request('/static/invoice/editAptitudeInvoice.json',data)

export const invoiceAptitudeDelete = (data) => request('/static/invoice/aptitudeDelete.json',data)

export const getInvoiceAptitudeList = (data) => request('/static/invoice/aptitudeList.json',data)

export const invoiceEditInfo = (data) => request('/static/invoice/editInfo.json',data)


