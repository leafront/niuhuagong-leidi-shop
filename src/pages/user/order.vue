<template>
	<div class="pageView">
		<AppHeader :title="title" :backFn="backFn"/>
		<div class="order_menu">
			<ul class="order_menu_list">
				<li v-for="(item,i) in orderTxt" :class="{'active': order_status == item.status}" @click="showTab(item.status)"><span>{{item.name}}</span></li>
			</ul>
		</div>
		<div class="scroll-view-wrapper order-view" :class="{'visibility':!pageView}">
			<!--全部-->
			<template v-if="list && list.length">
				<div class="order_tab">
					<div class="order_item" v-for="(item,index) in list" :key="index">
						<div class="order_item_tit">
							<span>订单号：{{item.order_code}}</span>
							<strong>{{statusTxt[item.order_status]}}</strong>
						</div>
						<div class="order_info" v-for="(cItem,cIndex) in item.products" @click="pageAction('/order/detail?id='+item.order_id)">
							<div class="order_info_wrapper">
								<div class="order_img">
									<img :src="cItem.product_img"/>
								</div>
								<div class="order_info_txt">
									<p>{{cItem.product_name}}</p>
									<span>1.2kg</span>
								</div>
							</div>
							<div class="order_info_price">
								<span>￥{{cItem.product_price | price }}</span>
								<strong>×{{cItem.product_cnt}}</strong>
							</div>
						</div>
						<div class="order_money">
							<div class="order_reward">
								<svg class="ico ico_fanxian" aria-hidden="true">
									<use xlink:href="#icon-fanxian"></use>
								</svg>
								<span>奖励：<b>￥ 0.00</b></span>
							</div>
							<p>运费:￥ {{item.express_fee | price}}</p>
							<div class="order_money_total">
								<strong>合计:</strong>
								<i>￥ {{item.total_price | price}}</i>
							</div>
						</div>
						<template v-if="item.order_status == 10">
							<div class="order_status">
								<button class="order_btn_status"  @click="actionCancelOrder(item)">取消订单 </button>
								<button class="order_btn_status" @click="payAction(item)">我要付款 </button>
							</div>
						</template>
						<template v-if="item.order_status == 15">
							<div class="order_status">
								<button class="order_btn_status" @click="actionCancelOrder(item)">取消订单 </button>
							</div>
						</template>
						<template v-if="item.order_status == 20">
							<div class="order_status" @click="orderReceipt(item)">
								<button class="order_btn_status">确认收货 </button>
							</div>
						</template>
						<template v-if="item.order_status == 25">
							<div class="order_status">
								<button class="order_btn_status">已完成 </button>
							</div>
						</template>
						<template v-if="item.order_status == 30">
							<div class="order_status">
								<button class="order_btn_status">再次购买 </button>
							</div>
						</template>
					</div>
				</div>
			<!--全部-->
			</template>
			<template v-else>
				<div class="ui-empty">
					<img src="./images/order_empty_bg.png"/>
					<p>还没有购买商品</p>
				</div>
			</template>
			<Overlay>
				<div class="overlay_title" slot="title">
					<h5>请选择取消订单的理由</h5>
				</div>
				<div class="overlay_cont" slot="content">
					<div class="order_refund">
						<ul class="order_refund_list">
							<li v-for="(item,index) in refundList" @click="selectRefund(index)">
								<span>{{item.name}}</span>
								<div class="refund_checked" :class="{'active':refundIndex == index}">
									<svg class="ico refund_checked_ico" aria-hidden="true">
										<use xlink:href="#icon-gou"></use>
									</svg>
								</div>
							</li>
						</ul>
					</div>
					<div class="overlay_submit">
						<span @click="updateOverlayVisible(false)">取消</span>
						<span @click="submitRefund">确定</span>
					</div>
				</div>
			</Overlay>
		</div>
	</div>
</template>

<script>
	
	import Overlay from '@/components/widget/overlay'

	import AppHeader from '@/components/common/header'
	
	import wx_pay from '@/widget/wx_pay'

	import { mapActions, mapGetters } from 'vuex'
	
	import * as Model from '@/model/order'
	
	export default {
		
		components: {

			Overlay,
			
			AppHeader
			
		},
		
		data () {
			
			const order_status =  this.$route.query.status
			
			return {
				
				list:[],
				
				order_status,
				order_id: '',
				title: '我的订单',
				refundIndex: 0,
				
				refundList:[{
					name: '我不想买了',
					cancel_code: 1
				},{
					name: '商品缺货',
					cancel_code: 2
				},{
					name: '收货信息有误',
					cancel_code: 3
				},{
					name: '商品数量/款式有误',
					cancel_code: 4
				},{
					name: '其他原因',
					cancel_code: 5
				}],
				
				statusTxt: {
					'0': '已取消',
					'10': '待支付',
					'15': '待发货',
					'20':  '已发货',
					'25': '已完成'
				},
				
				orderTxt: [{
					name:'全部',
					status: -1
				},{
					name:'待支付',
					status: 10
				},{
					name:'待发货',
					status: 15
				},{
					name:'待收货',
					status: 20
				},{
					name:'待评价',
					status: 25
				}]
				
			}
			
		},

		mixin: ['loading'],

		computed: {

			...mapGetters({
				'pageView': 'getPageView'

			})
		},

		beforeCreate () {

			document.title = '我的订单'

		},
		
		created () {
			
			this.updatePageView(false)

			this.getUserOrder(this.order_status)
			
			this.showLoading()
			
		},
		methods: {
			
			...mapActions([
				'updateOverlayVisible',
				'updatePageView'
			]),
			backFn () {

				this.pageAction('/user/center')

			},
			
			/**
			 *
			 * 确认收货
			 */

			orderReceipt (item) {
				
				this.$showLoading()
				
				Model.orderReceipt({
					type: 'POST',
					data: {
						order_id: item.order_id
					}
				}).then((res) => {

					const data = res.data
					
					if (data && res.status >= 1) {

						this.$hideLoading()

						this.$toast(res.msg)

						const order_status = this.order_status

						this.getUserOrder(order_status)
						
					} else {

						this.$hideLoading()

						this.$toast(res.msg)

					}

				})
				
			},
			
			/**
			 * 去微信支付
			 */

			payAction ({order_id}) {
				
				wx_pay.payInfo.call(this,order_id)
				
			},
			/**
			 * 取消订单
			 */
			
			cancelUserOrder () {
				
				const cancel_code = this.refundList[this.refundIndex].cancel_code
				Model.cancelUserOrder({
					type: 'POST',
					data: {
						cancel_code,
						order_id: this.order_id
					}
				}).then((res) => {

					const data = res.data
					if (data && res.status >= 1) {

						this.$toast(res.msg)

						const order_status = this.order_status
						
						this.getUserOrder(order_status)

					} else {

						this.$toast(res.msg)

					}

				}).catch((err) => {

					this.$toast('网络服务错误')

				})
				
			},

			/**
			 *
			 * 获取用户订单信息
			 */

			getUserOrder (status=-1) {
				
				Model.getUserOrder({
					type: 'GET',
					data: {
						order_status: status
					}
				}).then((res) => {

					const data = res.data
					if (data && res.status >= 1) {
						this.updatePageView(true)
						this.$hideLoading()
						this.list = data

					} else {
						
						this.$hideLoading()

						this.$toast(res.msg)

					}

				})
				
			},

			showTab (order_status) {
				
				this.order_status = order_status

				this.getUserOrder(order_status)
				
			},

			selectRefund (index) {
				
				this.refundIndex = index
				
			},

			pageAction (url) {
				
				this.$router.push(url)
				
			},
			
			actionCancelOrder (item) {
				
				this.order_id = item.order_id

				this.updateOverlayVisible(true)
				
			},

			submitRefund () {
				
				this.updateOverlayVisible(false)
				
				this.cancelUserOrder()
				
			}
		}
		
	}
	
</script>

<style lang="scss">
	
	.order_tab{
		
		padding-bottom: .5rem;
		
	}
	
	.order_reward{
		
		width: 2.5rem;
		
		display: flex;
		
		align-items: center;
		
	}
	
	.ico_fanxian{
		
		width: .36rem;
		height: .36rem;
		
		padding-right: .16rem;
		
		color: #f65253;
	
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
	
	.refund_checked{
		
		width: .4rem;
		
		height: .4rem;
		
		border-radius: 50%;
		
		margin-right: .3rem;
		
		display: flex;
		
		align-items: center;
		
		justify-content: center;
		
		background: #fff;
		
		border: .02rem solid #252525;
		
		&.active{
			
			background: #252525;
			
		}
		.refund_checked_ico{
			
			width: .26rem;
			height: .2rem;
			color: #fff;
			
		}
	}
	
	
	
	
	.order_refund_list{
		
		
		li{
			
			display: flex;
			
			justify-content: space-between;
			
			height: .8rem;
			
			align-items: center;
			
			span{
				
				font-size: .3rem;
				
				color: #252525;
				
			}
			
		}
		
	}
	
	.order_refund{
		
		padding: .32rem .35rem;
		
	}
	.order_status{
		
		height: .75rem;
		
		display: flex;
		
		align-items: center;
		
		justify-content: flex-end;
		
		padding-right: .26rem;
		
		.order_btn_status{
			
			margin-left: .24rem;
		
			height: .46rem;
			
			line-height: .46rem;
			
			padding: 0 .18rem;
			
			border-radius: .44rem;
			
			color: #252525;
			
			background: #fff;
			
			border:1px solid #a8a8a8;
		
		}
		
	}
	
	.order_money{
		
		display:flex;
		
		align-items: center;
		
		justify-content: space-between;
		
		height: .75rem;
		
		padding: 0 .3rem;
		
		border-bottom: 1px solid #f1f1f1;
		
		span{
			
			color: #252525;
			
		}
		
	}
	
	.order_money_total{
		
		strong{
			
			color: #252525;
		}
		
		span{
			
			color: #252525;
			
		}
		
		i{
			
			color: #f65253;
			
			font-size: .28rem;
			
			font-weight:bold;
			
			padding-left: .2rem;
			
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
	
	.order_item{
		
		background: #fff;
		
		margin-top: .24rem;
		
	}
	
	.order_item_tit{
		
		display:flex;
		
		align-items: center;
		
		justify-content: space-between;
		
		padding: 0 .3rem;
	
		height: .75rem;
		
		border-bottom: 1px solid #f5f5f5;
		
		color: #9d9d9d;
	
	}
	
	.order_menu{
		
		background: #fff;
	}
	
	.order-view{
		
		background: #f6f6f6;
	}
	
	.order_menu_list{
		
		height: 1.02rem;
		
		display: flex;
		
		padding: 0 .24rem;
		
		
		li{
			
			display: flex;
			
			justify-content: center;
			
			align-items: center;
			
			flex: 1;
			
			border-bottom: .04rem solid transparent;
			
			color: #252525;
			
			font-size: .26rem;
			
			&.active {
				
				border-bottom: .04rem solid #008aec;
				
			}
			
		}
		
	}
	
</style>