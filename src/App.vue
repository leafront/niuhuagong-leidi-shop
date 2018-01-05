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
				const script = document.createElement('script')
				script.appendChild(document.createTextNode(res))
				document.head.appendChild(script)

				const expires = 30 * 60 * 1000
				
				let result = {
					times: new Date().getTime() + expires,
					results: res
				}

				if (!store.get('/static/fonts/iconfont.js')) {
					
					store.set('/static/fonts/iconfont.js', result)
					
				}
			})
			
		},
		watch: {
			'$route'() {
				
				this.$nextTick(() => {
					
					utils.fixedBottom()

					const pathname = location.pathname + location.search
					
					if (!utils.isWeixin()) {

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
	@import './styles/dialog.scss';
	@import './styles/footer.scss';
	@import './styles/main.scss';
	@import './styles/selectMenu.scss';
	
</style>
