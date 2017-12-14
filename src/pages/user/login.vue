<template>
	<div class="pageView">
		<AppHeader :title="title"/>
		<div class="scroll-view-wrapper white-view">
			<div class="login">
				<div class="user_form">
					<div class="user_form_item">
						<svg class="ico login_tel_ico" aria-hidden="true">
							<use xlink:href="#icon-shouji"></use>
						</svg>
						<span></span>
						<input type="tel"  class="login_input" placeholder="请输入手机号码"/>
						<div class="user_form_code">
							<button class="login_code">获取验证码</button>
						</div>
					
					</div>
					<div class="user_form_item">
						<svg class="ico login_msg_ico" aria-hidden="true">
							<use xlink:href="#icon-yanzhengma"></use>
						</svg>
						<span></span>
						<input type="tel" class="login_input" placeholder="请输入验证码"/>
					</div>
					<div class="user_form_pass">
						<span @click="pageAction('/user/pass')">使用密码登录</span>
						<span>忘了密码</span>
					</div>
					<div class="user_login">
						<span class="submit_button">登录</span>
					</div>
					<div class="user_tips">
						<span @click="pageAction('/user/register')">还没有账户，马上去<strong>注册</strong></span>
					</div>
				</div>
			</div>
		
		</div>
	</div>
</template>

<script>
	
	
	import AppHeader from '@/components/common/header'
	
	export default {
		
		components: {

			AppHeader
			
		},
		
		data () {
			
			return {
				
				title: '登录帐号'
				
			}
			
		},
		
		beforeCreate () {
			
			document.title = '登录帐号'
		
		},
		
		methods: {

			pageAction (url) {
				
				this.$router.push(url)
				
			}
			
		}
		
	}
	
</script>

<style lang="scss">
	
	@import '../../styles/user.scss';
	
	.user_form{
		
		padding-top: 1rem;
	}
	
	.user_login{
		
		padding-top: .8rem;
		
		span{
			background: #1ba0e5;
		}
		
	}
</style>