<template>
	<div class="pageView">
		<AppHeader :title="title"></AppHeader>
		<div class="scroll-view-wrapper" :class="{'visibility':!pageView}">
			<div class="shop_detail">
				<img src="http://files.niuhuagong.com/img/item/big_60f04603d7f57a5ca877a29f752b7716.jpg"/>
			</div>
			<div class="shop_detail_info">
				<p>雷帝彩色美缝剂抗污防霉填缝剂瓷砖地砖防水勾的规范地缝剂</p>
				<div class="shop_detail_price">
					<strong>￥80.00</strong>
					<span>奖励: <b>￥10.00</b></span>
				</div>
			</div>
			<div class="shop_size" @click="updateIsOverlayVisible(1)">
			  <span>选择规格</span>
				<div class="shop_size_info">
					<strong>已选择：红褐色</strong>
					<svg class="ico order_arrow_right" aria-hidden="true">
						<use xlink:href="#icon-jiantou-right"></use>
					</svg>
				</div>
			
			</div>
			<div class="shop_detail_des">
				<h4>具体详情</h4>
				<div class="shop_detail_cont">
					<img :src="shopDesImg"/>
				</div>
			</div>
		</div>
		<div class="join_cart" :class="{'page_bottom':isWeixinIphoneX}">
			<div class="join_cart_icon" @click="pageAction('/user/cart')">
				<i class="order_cart_num" v-show="cartNum">{{cartNum}}</i>
				<svg class="ico cart_icon" aria-hidden="true">
					<use xlink:href="#icon-gouwuche1"></use>
				</svg>
				<span>购物车</span>
			</div>
			<div class="join_cart_submit">
				<span @click="submitOrder(false)">加入购物车</span>
				<strong @click="submitOrder(true)">立即购买</strong>
			</div>
		</div>
		<ShopFoot :isSubmit="isSubmit"/>
	</div>
</template>

<script>

	import AppHeader from '@/components/common/header'

	import ShopFoot from '@/components/common/popup/shopFoot'

	import utils from '@/widget/utils'
	
	import shopDesImg from './images/shop_des.png'

	import * as API from '@/api/detail'
	
	import { mapGetters, mapActions } from 'vuex'

	export default {
		
		components: {
			AppHeader,
			ShopFoot
		},

		data () {

			return {
				isSubmit: false,
				title: '产品详情',
				shopDesImg,
				isWeixinIphoneX: utils.isWeixinIphoneX()
			}
		},
		computed: {

			...mapGetters({
				'pageView': 'getPageView',
				'cartNum': 'getCartNum'

			})
		},
		methods: {

			pageAction(url) {

				this.$router.push(url)

			},
			
			...mapActions([
				'updateIsOverlayVisible',
				'updatePageView'
			]),
			
			submitOrder (val) {

				this.updateIsOverlayVisible(1)
				
				this.isSubmit = val
				
			},
			
			getProductDetail () {
				
				API.getProductDetail({
					type: 'POST',
					data:{"cityId":10201,"appCode":101,"lcb_client_id":"00187fab-10c4-4074-9406-2a582079bdee","lcb_request_id":"d57ac001-77bf-4e30-8af6-339102e9ae90","lcb_h5_v":"6.5.2"},
					cache: true,
				}).then((res) => {
//
//					const data = res.data
//
//					if (data && res.status >= 1) {
//
//
//
//					} else {
//
//						this.$toast(data.msg)
//
//					}

					this.updatePageView(true)

					this.$hideLoading()

				})

			}
		},
		
		
		beforeCreate () {

			document.title = '产品详情'
			
		},
		
		created () {

			this.updatePageView(false)

			this.$showLoading()
			
			this.getProductDetail()
			
			
		}
	}
	
</script>

<style lang="scss">
	
	
	.join_cart_submit{
		
		display: flex;
		
		font-size: .3rem;
		
		flex: 1;
		
		
	}
	
	
	.join_cart_icon{
		
		padding:0 .7rem;
		
		display: flex;
		
		align-items: center;
		
		justify-content: center;
		
		flex-direction: column;
		
		position: relative;
		
		.order_cart_num{
			
			position: absolute;
			
			padding: 0 .09rem;
			
			height: .2rem;
			
			display: block;
			
			left:52%;
			
			top:.12rem;
			
			border-radius: .075rem;
			
			background: #f23030;
			
			color: #fff;
			
			font-size: .16rem;
			
			text-align: center;
			
		}
		
		span{
			
			color: #232326;
			
			font-size: .18rem;
			
		}
		
		.cart_icon{
		
			width: .5rem;
			
			height: .45rem;
			
			color: #9d9d9d;
		}
		
	}
	
	
	.join_cart{
		
		display: flex;
		
		font-size: .38rem;
		
		align-content: center;
		
		background: #fff;
		
	}
	
	.join_cart_submit{
		
		span,strong{
			
			height: 1rem;
			
			flex:1;
			display: flex;
			align-items: center;
			
			justify-content: center;
			
			color: #fff;
			
		}
		
		span{
			
			background: #FF9500;
			
		}
		strong{
			
			background: #f65253;
			
		}
	}
	
	.shop_detail_des{
		
		margin-top: .23rem;
		
		background: #fff;
		
		
		
		h4{
			
			height: .74rem;
			
			line-height: .74rem;
			
			text-align: center;
			
			font-size: .28rem;
			
		}
		
	}
	
	.shop_size{
		
		margin-top: .23rem;
		
		height: .74rem;
		
		background: #fff;
		
		display: flex;
		
		align-items: center;
		
		justify-content: space-between;
		
		padding: 0 .25rem;
		
		span{
			font-size: .28rem;
			
		}
		.order_arrow_right{
			width: .25rem;
			height: .5rem;
			color: #252525;
		}
		
	}
	
	.shop_size_info{
		
		display: flex;
		
		align-items: center;
		
		strong{
			
			font-size: .28rem;
			
		}
		
	}
	
	.shop_detail{
		
		padding: .4rem 0;
		
		background: #fff;
		
		display: flex;
		
		justify-content: center;
		
		img{
			
			width: 5.5rem;
			
			height: 5.5rem;
			
		}
		
	}
	
	.shop_detail_cont{
		
		img{
			
			width:100%;
			
		}
		
	}
	
	.shop_detail_info{
		
		background:#fff;
		
		padding: 0 .3rem;
		
		p{
			
			line-height: .44rem;
			
			font-size: .28rem;
			
			padding-bottom: .12rem;
			
		}
		
	}
	.shop_detail_price{
		
		display:flex;
		
		justify-content: space-between;
		
		align-content: center;
		
		padding-top: .12rem;
		
		padding-bottom: .24rem;
		
		strong{
			
			color: #f65253;
			
			font-size: .38rem;
			
		}
		
		span{
			
			line-height: .5rem;
			
			b {
				
				color: #f65253;
				
			}
			
		}
	
		
	}
	
</style>