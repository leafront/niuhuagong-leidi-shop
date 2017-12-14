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
				<svg class="ico order_arrow_right" aria-hidden="true">
					<use xlink:href="#icon-jiantou-right"></use>
				</svg>
			</div>
			<div class="shop_detail_des">
				<h4>具体详情</h4>
				<div class="shop_detail_cont">
					<img :src="shopDesImg"/>
				</div>
			</div>
		</div>
		<div class="join_cart" :class="{'page_bottom':isWeixinIphoneX}">
			<span>加入购物车</span>
			<strong @click="submitOrder">立即购买</strong>
		</div>
		<SelectPopup/>
	</div>
</template>

<script>

	import AppHeader from '@/components/common/header'
	
	import SelectPopup from '@/components/common/selectPopup'

	import utils from '@/widget/utils'
	
	import shopDesImg from './images/shop_des.png'
	
	import { mapGetters, mapActions } from 'vuex'

	export default {
		
		components: {
			AppHeader,
			SelectPopup
		},

		data () {

			return {
				title: '产品详情',
				shopDesImg,
				isWeixinIphoneX: utils.isWeixinIphoneX()
			}
		},
		computed: {

			...mapGetters({
				'pageView': 'getPageView'

			})
		},
		methods: {
			
			...mapActions([
				'updateIsOverlayVisible',
				'updatePageView'
			]),
			
			submitOrder () {

				this.updateIsOverlayVisible(1)
				
			}
		},
		
		beforeCreate () {

			document.title = '产品详情'
			
		},
		
		created () {

			this.updatePageView(false)

			this.$showLoading()

			setTimeout(() => {

				this.updatePageView(true)

				this.$hideLoading()

			},300)
			
		}
	}
	
</script>

<style lang="scss">
	
	
	.join_cart{
		
		display: flex;
		
		font-size: .38rem;
		
		align-content: center;
		
		span,strong{
			
			height: 1rem;
			
			flex:1;
			display: flex;
			align-items: center;
			
			justify-content: center;
			
		}
		
		span{
			
			background: #e6e6e6;
			
		}
		strong{
			
			color: #fff;
			
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
			color: #c1c1c1;
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