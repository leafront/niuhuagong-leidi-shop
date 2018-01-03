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
		
		methods: {

			pageAction (url) {

				this.$router.push(url);

			},
			
		},
		beforeCreate () {
			
			/**
			 * 获取iconfont 字体文件缓存
			 */

			API.getIconFont({
				type: 'GET',
				dataType: 'text',
				cache: true
			}).then((res) => {

				const script = document.createElement('script');
				script.appendChild(document.createTextNode(res))
				document.head.appendChild(script);

			})
			
		},
		watch: {
			'$route'() {
				
				this.$nextTick(() => {
					
					utils.fixedBottom()

					const pathname = location.pathname + location.search
					
					if (!utils.isWeixin()) {

						//wxOauthLogin()
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
