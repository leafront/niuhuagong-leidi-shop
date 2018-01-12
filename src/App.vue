<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
	
	import { mapGetters, mapActions } from 'vuex'
	
	import * as API from '@/api/common'
	
	import utils from '@/widget/utils'
	
	import * as userAPI from  '@/api/user'
	
	import store from '@/widget/store'
	
	import { wxOauthLogin } from '@/widget/common'
	
	export default {
		
		beforeCreate () {
			
			/**
			 * 获取iconfont 字体文件缓存
			 */

			API.getIconFont({
				type: 'GET',
				dataType: 'text',
				cache: true
			}).then((res) => {
				
				utils.appendScript(res)

				const expires = 30 * 60 * 1000

				let result = {
					times: new Date().getTime() + expires,
					results: res
				}

				if (!store.get('/static/fonts/iconfont.js')) {

					store.set('/static/fonts/iconfont.js', result)

				}
			})


			/**
			 * 获取 fastclick 文件缓存
			 */

			API.getFastClick({
				type: 'GET',
				dataType: 'text',
				cache: true
			}).then((res) => {

				if (!store.get('/static/fastclick/index.js')) {

					const expires = 30 * 60 * 60 * 1000

					let result = {
						times: new Date().getTime() + expires,
						results: res
					}

					utils.appendScript(res)

					store.set('/static/fastclick/index.js', result)

					if ('addEventListener' in document) {
						document.addEventListener('DOMContentLoaded', function() {
							FastClick.attach(document.body);
						}, false);
					}

				}
			})
			
		},
		watch: {
			'$route'() {
				
				this.$nextTick(() => {
					
					utils.fixedBottom()

					const pathname = location.pathname + location.search
					
					if (!utils.isWeixin() && location.origin == 'http://shop.laticrete.niutu.co') {

						wxOauthLogin()
					}
					
				})
			}
		}
	}
	
</script>

<style lang="scss">
	@import './styles/reset.scss';
	@import './styles/loading.scss';
	@import './styles/toast.scss';
	@import './styles/footer.scss';
	@import './styles/main.scss';
	@import './styles/selectMenu.scss';
	
</style>
