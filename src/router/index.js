import Vue from 'vue'

import Router from 'vue-router'

const Home = r => require.ensure([], () => r(require('@/pages/home')), 'Home')

const Cate = r => require.ensure([], () => r(require('@/pages/cate')), 'Cate')

const ShopDetail = r => require.ensure([], () => r(require('@/pages/detail')), 'ShopDetail')

const UserCart = r => require.ensure([], () => r(require('@/pages/user/cart')), 'UserCart')

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

const UserService = r => require.ensure([], () => r(require('@/pages/user/service')),'UserService')

const UserIncome = r => require.ensure([], () => r(require('@/pages/user/income')),'UserIncome')

const UserAssets = r => require.ensure([], () => r(require('@/pages/user/assets')),'UserAssets')

const UserCash = r => require.ensure([], () => r(require('@/pages/user/cash')),'UserCash')

const Search = r => require.ensure([], () => r(require('@/pages/search')),'Search')

const UserLogin = r => require.ensure([], () => r(require('@/pages/user/login')),'UserLogin')

const UserRegister = r => require.ensure([], () => r(require('@/pages/user/register')),'UserRegister')

const InvoiceBilling = r => require.ensure([], () => r(require('@/pages/invoice/billing')),'InvoiceBilling')

const InvoiceBillingAdd = r => require.ensure([], () => r(require('@/pages/invoice/billing/add')),'InvoiceBillingAdd')

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
			path: '/user/cart',
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
			path: '/user/register',
			name: 'UserRegister',
			component: UserRegister
		},{
			path: '/invoice/billing',
			name: 'InvoiceBilling',
			component: InvoiceBilling
		},{
			path: '/invoice/billing/add',
			name: 'InvoiceBillingAdd',
			component: InvoiceBillingAdd
		}
  ]
})
