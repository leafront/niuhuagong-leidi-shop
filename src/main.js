
import Vue from 'vue'

import App from './App'

import router from './router'

import FastClick from 'fastclick'

import store from './store'

import Toast from '@/components/toast'

import pageLoading from '@/components/loading'

import dialog from '@/components/dialog'

import filter from '@/filters'

Object.keys(filter).forEach(key => {
	Vue.filter(key, filter[key])
})

Vue.use(Toast,{    //支持全局配置
	duration: "2000"
})

Vue.use(pageLoading)


if ('addEventListener' in document) {
	document.addEventListener('DOMContentLoaded', function() {
		FastClick.attach(document.body);
	}, false);
}

new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App }
})
