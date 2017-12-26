import Vue from 'vue'

import Router from 'vue-router'

const Home = r => require.ensure([], () => r(require('@/pages/home')), 'Home')

const Cate = r => require.ensure([], () => r(require('@/pages/cate')), 'Cate')

const ShopDetail = r => require.ensure([], () => r(require('@/pages/detail')), 'ShopDetail')

const UserCart = r => require.ensure([], () => r(require('@/pages/cart')), 'UserCart')

const UserCenter = r => require.ensure([], () => r(require('@/pages/user/center')), 'UserCenter')

const UserOrder = r => require.ensure([], () => r(require('@/pages/user/order')), 'UserOrder')

const OrderDetail = r => require.ensure([], () => r(require('@/pages/order/detail')),'OrderDetail')

const UserPersonal = r => require.ensure([], () => r(require('@/pages/user/personal')),'UserPersonal')

const UserAuth = r => require.ensure([], () => r(require('@/pages/user/auth')),'UserAuth')

const OrderLogistics = r => require.ensure([], () => r(require('@/pages/order/logistics')),'OrderLogistics')

const UserAddress = r => require.ensure([], () => r(require('@/pages/user/address')),'UserAddress')

const UserAddressAdd  = r => require.ensure([], () => r(require('@/pages/user/address/add')),'UserAddressAdd')

const UserAddressEdit = r => require.ensure([], () => r(require('@/pages/user/address/edit')),'UserAddressEdit')

const Invoice = r => require.ensure([], () => r(require('@/pages/invoice')),'Invoice')

const passLogin = r => require.ensure([], () => r(require('@/pages/user/pass')), 'passLogin')

const UserService = r => require.ensure([], () => r(require('@/pages/user/service')),'UserService')

const UserIncome = r => require.ensure([], () => r(require('@/pages/user/income')),'UserIncome')

const UserAssets = r => require.ensure([], () => r(require('@/pages/user/assets')),'UserAssets')

const UserCash = r => require.ensure([], () => r(require('@/pages/user/cash')),'UserCash')

const Search = r => require.ensure([], () => r(require('@/pages/search')),'Search')

const UserLogin = r => require.ensure([], () => r(require('@/pages/user/login')),'UserLogin')

const UserRegister = r => require.ensure([], () => r(require('@/pages/user/register')),'UserRegister')

const OrderSubmit = r => require.ensure([], () => r(require('@/pages/order/submit')),'OrderSubmit')
//用户发票管理

const InvoiceBilling = r => require.ensure([], () => r(require('@/pages/invoice/billing')),'InvoiceBilling')

const InvoiceInfo = r => require.ensure([], () => r(require('@/pages/invoice/info/index')),'InvoiceInfo')

const InvoiceInfoAdd = r => require.ensure([], () => r(require('@/pages/invoice/info/add')),'InvoiceInfoAdd')

const InvoiceInfoEdit = r => require.ensure([], () => r(require('@/pages/invoice/info/edit')),'InvoiceInfoEdit')

const InvoiceHistory = r => require.ensure([], () => r(require('@/pages/invoice/history')),'InvoiceHistory')

const InvoiceHistoryDetail = r => require.ensure([], () => r(require('@/pages/invoice/history/detail')),'InvoiceHistoryDetail')

const InvoiceAddress = r => require.ensure([], () => r(require('@/pages/invoice/address/index')),'InvoiceAddress')

const InvoiceAddressAdd = r => require.ensure([], () => r(require('@/pages/invoice/address/add')),'InvoiceAddressAdd')

const InvoiceAddressEdit = r => require.ensure([], () => r(require('@/pages/invoice/address/edit')),'InvoiceAddressEdit')

const InvoiceComplete = r => require.ensure([], () => r(require('@/pages/invoice/complete')),'InvoiceComplete')

const InvoiceFail = r => require.ensure([], () => r(require('@/pages/invoice/fail')),'InvoiceFail')

const InvoiceSuccess = r => require.ensure([], () => r(require('@/pages/invoice/success')),'InvoiceSuccess')

const AuthFactory = r => require.ensure([], () => r(require('@/pages/auth/factory')),'AuthFactory')

const AuthArtisan = r => require.ensure([], () => r(require('@/pages/auth/artisan')),'AuthArtisan')

const AuthGuide = r => require.ensure([], () => r(require('@/pages/auth/guide')),'AuthGuide')

Vue.use(Router)

export default new Router({
	mode:'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },{
			path: '/cate',
			name: 'Cate',
			component: Cate
		},{
			path: '/detail/:id',
			name: 'ShopDetail',
			component: ShopDetail
		},{
			path: '/cart',
			name: 'UserCart',
			component: UserCart
		},{
		  path: '/user/center',
			name: 'UserCenter',
			component: UserCenter
		},{
			path: '/user/order',
			name: 'UserOrder',
			component: UserOrder
		},{
			path: '/order/detail',
			name: 'OrderDetail',
			component: OrderDetail
		},{
			path: '/user/personal',
			name: 'UserPersonal',
			component: UserPersonal
		},{
			path: '/user/auth',
			name: 'UserAuth',
			component: UserAuth
		},{
			path: '/order/logistics',
			name: 'OrderLogistics',
			component: OrderLogistics
		},{
			path: '/user/address',
			name: 'UserAddress',
			component: UserAddress
		},{
			path: '/user/address/add',
			name: 'UserAddressAdd',
			component: UserAddressAdd
		},{
			path: '/user/address/edit',
			name: 'UserAddressEdit',
			component: UserAddressEdit
		},{
			path: '/invoice',
			name: 'Invoice',
			component: Invoice
		},{
			path: '/user/service',
			name: 'UserService',
			component: UserService
		},{
			path: '/user/income',
			name: 'UserIncome',
			component: UserIncome
		},{
		  path: '/user/assets',
			name: 'UserAssets',
			component: UserAssets
		},{
			path: '/search',
			name: 'Search',
			component: Search
		},{
			path: '/user/login',
			name: 'UserLogin',
			component: UserLogin
		},{
			path: '/user/cash',
			name: 'UserCash',
			component: UserCash
		},{
			path: '/user/pass',
			name: 'passLogin',
			component: passLogin
		},{
			path: '/user/register',
			name: 'UserRegister',
			component: UserRegister
		},{
			path: '/order/submit',
			name: 'OrderSubmit',
			component: OrderSubmit
		},{
			path: '/invoice/billing',
			name: 'InvoiceBilling',
			component: InvoiceBilling
		}, {
			path: '/invoice/info',
			name: 'InvoiceInfo',
			component: InvoiceInfo
		},{
			path: '/invoice/info/add',
			name: 'InvoiceInfoAdd',
			component: InvoiceInfoAdd
		},{
			path: '/invoice/info/edit',
			name: 'InvoiceBillingEdit',
			component: InvoiceInfoEdit
		},{
			path: '/invoice/history',
			name: 'InvoiceHistory',
			component: InvoiceHistory
		},{
			path: '/invoice/history/:id',
			name: 'InvoiceHistoryDetail',
			component: InvoiceHistoryDetail
		},{
			path: '/invoice/address',
			name: 'InvoiceAddress',
			component: InvoiceAddress
		},{
			path: '/invoice/address/add',
			name: 'InvoiceAddressAdd',
			component: InvoiceAddressAdd
		},{
			path: '/invoice/address/edit',
			name: 'InvoiceAddressEdit',
			component: InvoiceAddressEdit
		},{
			path: '/invoice/complete',
			name: 'InvoiceComplete',
			component: InvoiceComplete
		},{
			path: '/invoice/success',
			name: 'InvoiceSuccess',
			component: InvoiceSuccess
		},{
			path: '/invoice/fail',
			name: 'InvoiceFail',
			component: InvoiceFail
		},{
			path: '/auth/factory',
			name: 'AuthFactory',
			component: AuthFactory
		},{
			path: '/auth/artisan',
			name: 'AuthArtisan',
			component: AuthArtisan
		},{
			path: '/auth/guide',
			name: 'AuthGuide',
			component: AuthGuide
		}
  ]
})
