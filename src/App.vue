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
	
	export default {
		
		methods: {

			pageAction (url) {

				this.$router.push(url);

			},
			/**
			 * 获取用户的信息
			 */
			getUserInfo () {
				userAPI.getUserInfo({
					type: 'GET'
				}).then((res) => {

					const data = res.data

					if (data && res.status >=1) {

						const times  = new Date().getTime() + 1.8 * 60 * 60 * 1000

						store.set('LEIDI_USER_INFO',{
							userInfo:data,
							times
						})

					}else if (data && res.status == -3001) {

						this.wxOauthLogin()
					
					} else{

						this.$toast(res.msg)
						
					}
				})
			},
			/**
			 *
			 * 用户认证
			 */
			wxOauthLogin () {

				userAPI.wxOauthLogin({
					type: 'GET',
					data: {
						refer_url: this.$route.fullPath
					}
				}).then((res) => {
					
					const data = res.data
					
					if (data && res.status >=1) {
						const times  = new Date().getTime() + 1.8 * 60 * 60 * 1000

						store.set('LEIDI_IS_LOGIN',{
							isLogin: true,
							times
						})
						
						console.log(data.url)
						
						//window.location.href = data.url
						
					} else {
						
						this.$toast(res.msg)
						
					}
					
				}).catch((err) => {
					
					this.$toast('网络服务器错误')
					
				})
			}
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
					
				})
				
				const isLogin = store.get('LEIDI_IS_LOGIN')
				
				const userInfo = store.get('LEIDI_USER_INFO')
				
				if (isLogin) {
					
					const time = isLogin.times
					
					if (new Date().getTime() > time) {

						this.wxOauthLogin()
						
					} else {
						
						if (!userInfo) {

							this.getUserInfo()
							
						}
					}
					
				} else {

					this.wxOauthLogin()
					
				}
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
