<template>
	<div class="pageView">
		<AppHeader :title="title"></AppHeader>
		<div class="scroll-view-wrapper" :class="{'visibility':!pageView}">
			<div class="order_submit">
				<template v-if="addressInfo">
					<div class="submit_address" @click="pageAction('/user/address?from=order')">
						<svg aria-hidden="true" class="ico icon_address">
							<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-dizhi1">
							</use>
						</svg>
						<div class="submit_address_info">
							<div class="submit_address_txt">
								<span>收货人：{{addressInfo.receiver}}</span>
								<span>{{addressInfo.mobile}}</span>
							</div>
							<p>收货地址：<i>{{addressInfo.province_name}}</i><i>{{addressInfo.city_name}}</i><i>{{addressInfo.area_name}}</i>{{addressInfo.address}}</p>
						</div>
						<svg class="ico order_arrow_right" aria-hidden="true">
							<use xlink:href="#icon-jiantou-right"></use>
						</svg>
					</div>
				</template>
				
				<template v-else>
					<div class="submit_order_item" @click="pageAction('/user/address?from=order')">
						<span>收货地址</span>
						<div class="submit_order_menu">
							<strong>请添加收货地址</strong>
							<svg aria-hidden="true" class="ico order_arrow_right">
								<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-jiantou-right">
								</use>
							</svg>
						</div>
					</div>
				</template>
				
				<template v-if="from">
					<div class="order_submit_list" v-for="(item,index) in cartList">
						<div class="order_info" @click="pageAction('/detail/'+item.product_id)">
							<div class="order_info_wrapper">
								<div class="order_img">
									<img :src="item.product_img"/>
								</div>
								<div class="order_info_txt">
									<p>{{item.product_name}}</p>
									<span>1.2kg</span>
								</div>
							</div>
							<div class="order_info_price">
								<span>￥{{item.price | price}}</span>
								<strong>×{{item.product_cnt}}</strong>
							</div>
						</div>
					</div>
				</template>
				<template v-else>
					<div class="order_submit_list">
						<div class="order_info" @click="pageAction('/detail/'+orderInfo.id)">
							<div class="order_info_wrapper">
								<div class="order_img">
									<img :src="orderInfo.product_img"/>
								</div>
								<div class="order_info_txt">
									<p>{{orderInfo.product_name}}</p>
									<span>1.2kg</span>
								</div>
							</div>
							<div class="order_info_price">
								<span>￥{{orderInfo.price | price}}</span>
								<strong>×{{orderInfo.product_cnt}}</strong>
							</div>
						</div>
					</div>
				</template>
				<div class="order_submit_price">
					<div class="submit_order_item">
						<span>运费</span>
						<div class="submit_order_menu">
							<strong>￥0</strong>
						</div>
					</div>
					<div class="submit_order_item">
						<span>应付总额</span>
						<div class="submit_order_menu">
							<strong>￥{{totalPrice | price}}</strong>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="order_submit_btn" @click="submitOrder" :class="{'page_bottom':isWeixinIphoneX,'visibility':!pageView}">
			<div class="order_total_price">
				<span>实付款：</span>
				<p><small>￥</small>{{totalPrice | price}}</p>
			</div>
			<button>立即支付</button>
		</div>
	</div>
	
</template>

<script>

	import AppHeader from '@/components/common/header'

	import utils from '@/widget/utils'
	
	import * as API from '@/api/order'

	import wx_pay from '@/widget/wx_pay'

	import { mapGetters, mapActions } from 'vuex'

	export default {

		components: {
			AppHeader
		},

		data () {

			return {
				from: this.$route.query.from,
				cartList: [],
				orderInfo: {},
				addressInfo: {},
				wareNumber: this.$route.query.wareNumber,
				title: '提交订单',
				list: [undefined,undefined],
				isWeixinIphoneX: utils.isWeixinIphoneX()
			}
		},
		computed: {

			...mapGetters({
				'pageView': 'getPageView'

			}),
			totalPrice () {
				
				const { from, cartList, orderInfo } = this
				
				let price = 0
				
				if (from == 'cart') {

					cartList.forEach((item) => {

						price += item.price * item.product_cnt
						
					})
					
				} else {
					
					price = orderInfo.price * orderInfo.product_cnt
					
				}
				
				return price
				
			}
		},
		methods: {

			...mapActions([
				'updatePageView'
			]),
			pageAction (url) {

				this.$router.push(url)

			},
			/**
			 * 获取用户默认地址
			 */
			
			getDefaultAddress () {
				
				API.getDefaultAddress({
					type: 'GET'
				}).then((res) => {
					
					const data = res.data

					if (res.status >= 1) {

						this.addressInfo = data

					} else {

						this.$toast(res.msg)

					}
				})
			},
			/**
			 * 获取用户购物车结算信息
			*/
			getCartInfo () {
				
				API.getCartInfo({
					type: 'GET',
				}).then((res) => {

					this.updatePageView(true)

					this.$hideLoading()

					const data = res.data
					
					if (data && res.status >= 1) {

						this.updatePageView(true)

						this.$hideLoading()

						this.cartList = data

					} else {
						this.$hideLoading()

						this.$toast(res.msg)

					}
				})
			},
			/**
			 * 获取用户结算商品信息
			 */
			getOrderInfo () {
				
				API.getOrderInfo({
					type: 'GET',
					data: {
						product_id: this.$route.query.id
					}
				}).then((res) => {
					
					const data = res.data
					
					const product_cnt = this.wareNumber
					
					if (data && res.status >= 1) {
						this.updatePageView(true)

						this.$hideLoading()
						
						data.product_cnt = product_cnt

						this.orderInfo = data
					
					} else {
						this.$hideLoading()
						this.$toast(res.msg)

					}
				})
				
			},
			/**
			 * 购物车订单创建提交
			 *
			 */
			
			createOrder (result) {

				API.createOrder({
					type: 'POST',
					data: result
				}).then((res) => {

					this.$hideLoading()

					const data = res.data

					if (data && res.status >= 1) {

						const orderId = data.order_id
						
						return orderId

					} else {

						this.$toast(res.msg)
						
						return

					}

				}).catch((err) => {

					this.$toast('网络服务错误')

				}).then((result) => {
					
					if (result) {

						wx_pay.payInfo.call(this,result)

					}
					
				})
				
			},
			
			/**
			 * 商品详情过来创建订单
			 */

			createQuickOrder (result) {
				
				result.product_id = this.$route.query.id

				result.product_cnt = this.wareNumber

				API.createQuickOrder({
					type: 'POST',
					data: result
				}).then((res) => {

					this.$hideLoading()

					const data = res.data

					if (data && res.status >= 1) {

						const orderId = data.order_id
						
						return orderId

					} else {

						this.$toast(res.msg)
						
						return

					}

				}).catch((err) => {

					this.$toast('网络服务错误')

				}).then((result) => {
					
					if (result) {

						wx_pay.payInfo.call(this,result)

					}

				})
				
			},
			/**
			 * 创建订单信息提交
			 *
			 */
			submitOrder () {

				if (!this.addressInfo) {

					this.$toast('请选择用户地址')
					return

				}
				
				const addr_id =  this.addressInfo.id
				
				const result = {
					addr_id
				}

				this.$showLoading()
				
				if (this.from == 'cart') {
					
					this.createOrder(result)
					
				} else {
					
					this.createQuickOrder(result)
				}
			}
		},

		beforeCreate () {

			document.title = '提交订单'

		},

		created () {

			this.updatePageView(false)

			this.$showLoading()
			
			this.getDefaultAddress()
			
			if (this.from =='cart') {
				
				this.getCartInfo()
				
			} else {
				
				this.getOrderInfo()
				
			}

		}
	}

</script>

<style lang="scss">
	
	.submit_address_txt{
		
		display: flex;
		
		justify-content: space-between;
		
		flex:1;
		
		
	}
	
	.submit_address_info{
		
		color: #666;
		
		font-size: .28rem;
		
		display: flex;
		
		flex:1;
		
		flex-direction: column;
		
		margin-left: .15rem;
		
		p{
			
			i{
				
				padding-right: .05rem;
				
			}
		}
		
	}
	.submit_address{
		
		background: #fff;
		
		padding: .3rem .2rem;
		
		display: flex;
		
		align-items: center;
		
		.order_arrow_right{
			
			width: .3rem;
			height: .6rem;
			color: #666;
			margin-left: .15rem;
			
		}
		.icon_address{
		
			width: .45rem;
			
			height: .5rem;
			color: #666;
		
		}
		
	}
	
	.order_submit_btn{
		
		background: #fff;
		
		margin-top:.24rem;
		
		display: flex;
		
		align-items: center;
		
		
		border-top: .01rem solid rgba(0,0,0,.1);
		
		border-bottom: .01rem solid rgba(0,0,0,.1);
		
		button{
			
			width: 2.3rem;
			
			height:.95rem;
			
			background: #f65253;
			
			line-height: .96rem;
			
			color: #fff;
			
			font-size: .3rem;
			
		}
		
	}
	
	.order_total_price{
		
		padding-left: .3rem;
		
		height:.95rem;
		
		display: flex;
		
		flex:1;
		
		align-items: center;
		
		border-bottom: .01rem solid rgba(0,0,0,.1);
		
		span{
			
			font-size: .3rem;
		}
		
		p{
			font-size: .4rem;
			
			color: #ff3c25;
			
			small{
				
				vertical-align: middle;
				
				font-size: .24rem;
			}
		}
		
	}
	
	.order_submit_price{
		
		margin-top: .24rem;
		
	}
	
	.order_submit_list{
		
		background: #fff;
		
		margin-top: .24rem;
		
	}
	
	
	.submit_order_item{
		
		height: 1rem;
		
		display: flex;
		
		align-items: center;
		
		justify-content: space-between;
		
		padding:0 .25rem;
		
		font-size: .28rem;
		
		border-bottom: .01rem solid rgba(0,0,0,.1);
		
		background: #fff;
		
		color: #666;
		
	}
	
	.submit_order_menu{
		
		display: flex;
		
		align-items: center;
		
		height: 1rem;
		
		.order_arrow_right{
			padding-left: .2rem;
			width: .25rem;
			height: .5rem;
			color: #9d9d9d;
			
		}
		
	}
	
	.order_info{
		
		padding: .4rem .3rem;
		
		display: flex;
		
		border-bottom: 1px solid #f1f1f1;
		
		justify-content: space-between;
		
	}
	
	.order_img{
		
		padding-right: .3rem;
		
		img{
			
			width: 1.2rem;
			
			height: 1.2rem;
			
		}
		
		
	}
	
	.order_info_txt{
		
		display: flex;
		
		flex-direction: column;
		
		p{
			color: #252525;
			
			line-height: .44rem;
			
		}
		
		span{
			
			display:block;
			
		}
		
		
	}
	
	.order_info_wrapper{
		
		display: flex;
		
	}
	
	.order_info_price{
		
		span{
			font-weight: bold;
			line-height: .44rem;
		}
		strong{
			
			color:#9d9d9d;
			
			display: block;
			
			text-align: right;
			
		}
	}




</style>
