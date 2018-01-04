<template>
	<div class="pageView">
		<div class="scroll-view-wrapper center-view" :class="{'visibility':!pageView}">
			<div class="user_pic_wrapper">
				<div class="user_pic">
					<div class="user_pic_info" v-if="userInfo" @click="pageAction('/user/auth')">
						<img :src="userInfo.headimgurl"/>
						<div class="user_info_txt">
							<span>{{userInfo.wx_nickname}}</span>
							<div class="user_info_status">
								<i>认证身份</i>
								<svg class="ico user_arrow_right" aria-hidden="true">
									<use xlink:href="#icon-jiantou-right"></use>
								</svg>
							</div>
						</div>
					</div>
					<div class="user_setting">
						<svg class="ico user_set_ico" aria-hidden="true">
							<use xlink:href="#icon-shezhi1"></use>
						</svg>
					</div>
				</div>
			</div>
			<div class="user_order">
				<div class="user_order_tit" @click="orderAction('/user/order?status=-1')">
					<span>我的订单</span>
					<div class="order_arrow">
						<strong>查看全部订单</strong>
						<svg class="ico order_arrow_right" aria-hidden="true">
							<use xlink:href="#icon-jiantou-right"></use>
						</svg>
					</div>
				</div>
				<div class="user_menu">
					<ul class="user_menu_list">
						<li @click="orderAction('/user/order?status=10')">
							<div class="order_status">
								<svg class="ico order_status_ico" aria-hidden="true">
									<use xlink:href="#icon-daifukuan"></use>
								</svg>
							</div>
							<span>待支付</span>
						</li>
						<li @click="orderAction('/user/order?status=15')">
							<div class="order_status">
								<svg class="ico order_status_ico" aria-hidden="true">
									<use xlink:href="#icon-fahuo"></use>
								</svg>
							</div>
							<span>待发货</span>
						</li>
						<li @click="orderAction('/user/order?status=20')">
							<div class="order_status">
								<svg class="ico order_status_ico" aria-hidden="true">
									<use xlink:href="#icon-daishouhuo"></use>
								</svg>
							</div>
							<span>待收货</span>
						</li>
						<li @click="orderAction('/user/order?status=25')">
							<div class="order_status">
								<svg class="ico order_status_ico" aria-hidden="true">
									<use xlink:href="#icon-pingjia"></use>
								</svg>
							</div>
							<span>待评价</span>
						</li>
					</ul>
				</div>
			</div>
			<div class="order_link">
				<div class="order_link_item" @click="pageAction('/user/address')">
					<svg class="ico order_link_ico" aria-hidden="true">
						<use xlink:href="#icon-address"></use>
					</svg>
					<span>收货地址管理</span>
				</div>
				<div class="order_link_item" @click="pageAction('/user/assets')">
					<svg class="ico order_link_ico" aria-hidden="true">
						<use xlink:href="#icon-fapiao"></use>
					</svg>
					<span>我的资产</span>
				</div>
				<div class="order_link_item" @click="pageAction('/invoice')">
					<svg class="ico order_link_ico" aria-hidden="true">
						<use xlink:href="#icon-shoucangjia"></use>
					</svg>
					<span>发票管理</span>
				</div>
				<div class="order_link_item" @click="pageAction('/user/service')">
					<svg class="ico order_link_ico" aria-hidden="true">
						<use xlink:href="#icon-shouhou"></use>
					</svg>
					<span>申请售后</span>
				</div>
			</div>
		</div>
		<AppFooter/>
	</div>
</template>

<script>

	import AppFooter from '@/components/common/footer'
	
	import * as API from '@/api/user'
	
	import { getUserInfo } from '@/widget/common'

	import { mapActions, mapGetters } from 'vuex'
	
	import store from '@/widget/store'
	
	export default {
		
		components: {
			AppFooter
		},
		
		data () {
			
			return {

				userInfo: null
				
			}
			
		},
		computed: {
			...mapGetters({
				'pageView':'getPageView'
			})
		},

		beforeCreate () {

			document.title = '个人中心'

		},
		
		created () {
			
			let userInfo = store.get('LEIDI_USER_INFO')

			this.$showLoading()

			this.updatePageView(false)

			if (userInfo) {

				this.$hideLoading()

				this.updatePageView(true)

				this.userInfo = userInfo.userInfo
				
			} else {

				this.getUserInfo()
				
			}
			
		},
		
		methods: {
			...mapActions([
				'updatePageView'
			]),

			pageAction (url) {
				
				this.$router.push(url)
				
			},
			orderAction (url) {
				
				window.location.href = url
				
			},
			/**
			 * 获取用户的信息
			 */
			getUserInfo () {
				API.getUserInfo({
					type: 'GET'
				}).then((res) => {
					const data = res.data

					if (data && res.status >= 1) {

						const times = new Date().getTime() + 1.8 * 60 * 60 * 1000

						store.set('LEIDI_USER_INFO', {
							userInfo: data,
							times
						})

						this.$hideLoading()
						this.updatePageView(true)

						this.userInfo = data

					} else {

						this.$hideLoading()
						
						this.$toast(res.msg)
						
					}
				})
			}
		}
	}
	
</script>

<style lang="scss">
	
	.center-view{
		
		background: #f2f2f2;
		
	}
	
	.user_info_status{
		
		margin-top: .12rem;
		
		padding: .1rem 0;
		
		width: 1.8rem;
		
		background: #0287cc;
		
		border-radius: .4rem;
		
		display: flex;
		
		align-items: center;
		
		justify-content: center;
		
		i{
			
			color: #fff;
		
		}
		
		.user_arrow_right{
			
			width: .25rem;
			height: .25rem;
			color: #fff;
			padding-left: .12rem;
		}

		
	}
	
	.order_link{
		
		margin-top: .23rem;
		
		background: #fff;
		
		padding-left: .28rem;
		
	}
	.order_link_item{
		
		height: 1.02rem;
		
		display:flex;
		
		align-items: center;
		
		border-bottom: 1px solid #ededed;
		
		span{
		
			color: #252525;
			
			font-size: .28rem;
			
		}
		.order_link_ico{
			
			margin-right: .25rem;
			
			width: .4rem;
			
			height: .4rem;
			
			color:#252525;
			
		}
		
	}
	
	.user_pic_wrapper{
		
		padding: .2rem;
		
		background: #fff;
		
	}
	
	.user_pic{
		
		padding: .3rem 0 .3rem .3rem;
		
		border-radius: .1rem;
		background: #1ba3ed;
		display:flex;
		align-items: center;
		justify-content: space-between;
	
	}

	.user_pic_info{
		
		display: flex;
		
		flex:1;
		
		align-items: center;
		
		img{
			width: 1.32rem;
			height: 1.32rem;
			border-radius: 50%;
			border: .04rem solid #fff;
		}
	}
	.user_info_txt{
		
		padding-left: .3rem;
		
		span{
			
			font-size: .36rem;
			color:#fff;
			display:block;
		}
		
		.user_info_tips{
			
			font-size: .21rem;
			
			background:transparent;
			
			margin-top: .18rem;
			
			border:2px solid #fff;
			
			color: #fff;
			
			padding: 0 .24rem;
			
			height: .44rem;
			
			border-radius: .24rem;
			
		}
	}
	
	.user_info_login{
		
		padding-left: .3rem;
		
		span{
			
			font-size: .36rem;
			color:#fff;
			display:block;
		}
		
	}
	
	.user_setting{
		
		padding:.6rem .3rem .5rem 1rem;
		
		.user_set_ico{
			width: .6rem;
			height: .6rem;
			color:#0287cc;
		}
	}
	.user_order{
		
		margin-top: .23rem;
		
		padding-left:.28rem;
		
		background: #fff;
		
	}
	
	.order_arrow{
		
		display:flex;
		
		align-items: center;
		
		padding-right: .28rem;
		
		strong{
			
			color: #a2a2a2;
			
		}
	}
	.user_order_tit{
		
		height: .92rem;
		
		display:flex;
		
		align-items: center;
		
		justify-content: space-between;
		
		border-bottom: 1px solid #ededed;
		
		span{
			
			font-size: .28rem;
		}
		
		.order_arrow_right{
			width: .3rem;
			height: .6rem;
			color: #c1c1c1;
		}
		
	}
	.user_menu_list{
		
		height: 1.66rem;
		
		display:flex;
		
		align-items: center;
		
		li{
			
			justify-content: center;
			
			align-items: center;
			
			display:flex;
			
			flex-direction: column;
			
			flex:1;
			
			span{
				
				color:#252525;
			}
		
		}
	}
	.order_status{
		
		position: relative;
		
		.order_status_ico {
			
			width: .65rem;
			
			height: .65rem;
			
			color: #1ba0e5;
		}
	}
</style>