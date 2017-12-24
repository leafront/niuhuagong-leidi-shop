<template>
	<div class="pageView">
		<AppHeader :title="title"></AppHeader>
		<div class="scroll-view-wrapper" id="appView" :class="{'visibility':!pageView}">
			<div class="order_wrapper" v-if="info">
				<div class="order_trade" @click="pageAction('/order/logistics')">
					<div class="order_trade_info">
						<svg class="ico icon_fahuo" aria-hidden="true">
							<use xlink:href="#icon-fahuo1"></use>
						</svg>
						<div class="order_trade_txt">
							<h5>交易完成</h5>
							<p>物流信息：订单交易完成</p>
							<span>2017-12-05  16:32</span>
						</div>
					</div>
					<div class="order_trade_arrow">
						<svg class="ico icon_jiantou_right" aria-hidden="true">
							<use xlink:href="#icon-jiantou-right"></use>
						</svg>
					</div>
				</div>
				<div class="order_address">
					<svg class="ico icon_address" aria-hidden="true">
						<use xlink:href="#icon-address"></use>
					</svg>
					<div class="order_address_info">
						<div class="order_address_txt">
							<span>{{info.receiver}}</span>
							<span>{{info.mobile}}</span>
						</div>
						<p>{{info.address}}</p>
					</div>
				</div>
				<div class="order_item">
					<div class="order_item_tit">
						<span>订单号：{{info.order_code}}</span>
					</div>
					<div class="order_info" @click="pageAction('/order/detail')" v-for="(item,index) in info.products">
						<div class="order_info_wrapper">
							<div class="order_img" @click="pageAction('/detail/'+item.id)">
								<img :src="item.product_img"/>
							</div>
							<div class="order_info_txt">
								<p>{{item.product_name}}</p>
								<span>1.2kg</span>
							</div>
						</div>
						<div class="order_info_price">
							<span>￥{{item.product_price | price}}</span>
							<strong>×{{item.product_cnt}}</strong>
						</div>
					</div>
				</div>
				<div class="order_detail_info">
					<div class="order_info_item">
						<span>订单总额</span>
						<strong>￥ {{info.order_price | price}}</strong>
					</div>
					<div class="order_info_item">
						<span>商品总价</span>
						<span>￥ {{info.total_price | price}}</span>
					</div>
					<div class="order_info_item">
						<span>运费</span>
						<span>￥ {{info.express_fee | price}}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
	
</template>

<script>

	import AppHeader from '@/components/common/header'

	import { mapGetters, mapActions } from 'vuex'
	
	import * as API from '@/api/order'

	export default {

		components: {
			AppHeader
		},

		data () {

			return {
				title: '订单详情',
				id: this.$route.query.id,
				info: null
			}
		},
		computed: {

			...mapGetters({
				'pageView': 'getPageView'

			})
		},
		methods: {

			...mapActions([
				'updatePageView'
			]),
			pageAction (url) {

				this.$router.push(url)

			},
			/**
			 * 获取订单详情
			 */
			getOrderDetail () {

				API.getOrderDetail({
					type: 'GET',
					data: {
						order_id: this.$route.query.id
					}
				}).then((res) => {

					this.updatePageView(true)
					this.$hideLoading()
					
					const data = res.data
					if (data && res.status >= 1) {

						this.info = data

					} else {

						this.$toast(res.msg)

					}

				})
				
			}
		},

		beforeCreate () {

			document.title = '订单详情'

		},

		created () {

			this.updatePageView(false)

			this.$showLoading()
			
			this.getOrderDetail()

		}
	}

</script>

<style lang="scss">
	
	.order_detail_info{
		
		margin-top: .24rem;
		
		background: #fff;
		
	}
	
	.order_info_item{
		
		padding: 0 .2rem;
	
		display: flex;
		
		justify-content: space-between;
		
		height: .78rem;
		
		align-items: center;
		
		border: .01rem solid #ededed;
		
		strong{
			
			font-size: .28rem;
			
			color: #f65253;
			
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
	
	.order_address_txt{
		
		display: flex;
		
		justify-content: space-between;
		
		padding-bottom: .15rem;
		
		span{
			
			font-size: .28rem;
			
		}
		
	}
	
	.order_address{
		padding: .34rem .3rem;
		
		background: #fff;
		display: flex;
		
		.icon_address{
			
			width: .41rem;
			
			height: .5rem;
			
			color: #bfbfbf;
		
		}
		
	}
	
	.order_address_info{
		
		padding-left: .3rem;
		
		p{
			
			color: #9d9d9d;
			
		}
		
	}
	
	.order_trade_txt{
		
		padding-left: .22rem;
		
		h5{
			
			font-size: .3rem;
			
			color: #fff;
			
			line-height: .4rem;
			
		}
		
		p{
			padding-top: .18rem;
			color: #fff;
			
			padding-bottom: .1rem;
			
		}
		
		span{
		
			color: rgba(255,255,255,.5);
		}
		
	}
	
	.order_trade_info{
		
		display: flex;
		.icon_fahuo{
		
			width: .4rem;
			
			height: .35rem;
			
			color: #fff;
		
		}
		
		
	}
	
	.order_trade_arrow{
	
		.icon_jiantou_right{
		
			width: .3rem;
			height: .4rem;
			color:#fff;
		}
	
	}

	.order_trade{
		
		display: flex;
		
		align-items: center;
		
		justify-content: space-between;
		
		padding: .4rem .2rem;
		
		background: #1ba0e5;
		
		
	}


</style>
