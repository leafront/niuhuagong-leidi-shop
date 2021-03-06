
import Vue from 'vue'

import App from './App'

import router from './router'

import store from './store'

import Toast from '@/components/toast'

import pageLoading from '@/components/loading'

import filter from '@/filters'

import { loading } from '@/mixins/loading'

Vue.mixin(loading)

Object.keys(filter).forEach(key => {
	Vue.filter(key, filter[key])
})

Vue.use(Toast,{    //支持全局配置
	duration: "2000"
})

Vue.use(pageLoading)

new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App }
})
