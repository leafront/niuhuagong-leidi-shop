<template>
	<div class="pageView">
		<AppHeader :title="title"></AppHeader>
		<div class="scroll-view-wrapper" id="appView" :class="{'visibility':!pageView}">
			<div class="order_submit">
				<div class="submit_order_item" @click="pageAction('/user/address')">
					<span>收货地址</span>
					<div class="submit_order_menu">
						<strong>请添加收货地址</strong>
						<svg aria-hidden="true" class="ico order_arrow_right">
							<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-jiantou-right">
							</use>
						</svg>
					</div>
				</div>
				<div class="submit_address">
					<svg aria-hidden="true" class="ico icon_address">
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-dizhi1">
						</use>
					</svg>
					<div class="submit_address_info">
						<div class="submit_address_txt">
							<span>收货人：叶亮</span>
							<span>18086463685</span>
						</div>
						<p>收货地址：<i>上海</i><i>闵行</i><i>莘庄镇</i>雅致路228弄6号101 </p>
					</div>
					<svg class="ico order_arrow_right" aria-hidden="true">
						<use xlink:href="#icon-jiantou-right"></use>
					</svg>
				</div>
				<div class="order_submit_list">
					<div class="order_info" @click="pageAction('/detail/22')">
						<div class="order_info_wrapper">
							<div class="order_img">
								<img src="//img.alicdn.com/imgextra/i3/17413633/TB225tKecjI8KJjSsppXXXbyVXa_!!0-saturn_solar.jpg_210x210.jpg"/>
							</div>
							<div class="order_info_txt">
								<p>雷帝幻彩全效环氧填缝剂（三组分）</p>
								<span>1.2kg</span>
							</div>
						</div>
						<div class="order_info_price">
							<span>￥185.00</span>
							<strong>×１</strong>
						</div>
					</div>
					<div class="order_info" @click="pageAction('/order/detail')">
						<div class="order_info_wrapper">
							<div class="order_img">
								<img src="//img.alicdn.com/imgextra/i3/17413633/TB225tKecjI8KJjSsppXXXbyVXa_!!0-saturn_solar.jpg_210x210.jpg"/>
							</div>
							<div class="order_info_txt">
								<p>雷帝幻彩全效环氧填缝剂（三组分）</p>
								<span>1.2kg</span>
							</div>
						</div>
						<div class="order_info_price">
							<span>￥185.00</span>
							<strong>×１</strong>
						</div>
					</div>
					<div class="order_info" @click="pageAction('/order/detail')">
						<div class="order_info_wrapper">
							<div class="order_img">
								<img src="//img.alicdn.com/imgextra/i3/17413633/TB225tKecjI8KJjSsppXXXbyVXa_!!0-saturn_solar.jpg_210x210.jpg"/>
							</div>
							<div class="order_info_txt">
								<p>雷帝幻彩全效环氧填缝剂（三组分）</p>
								<span>1.2kg</span>
							</div>
						</div>
						<div class="order_info_price">
							<span>￥185.00</span>
							<strong>×１</strong>
						</div>
					</div>
				</div>
				<div class="order_submit_price">
					<div class="submit_order_item">
						<span>运费</span>
						<div class="submit_order_menu">
							<strong>不支持发票</strong>
						</div>
					</div>
					<div class="submit_order_item">
						<span>应付总额</span>
						<div class="submit_order_menu">
							<strong>￥185.2</strong>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="order_submit_btn" :class="{'page_bottom':isWeixinIphoneX}">
			<div class="order_total_price">
				<span>实付款：</span>
				<p><small>￥</small>2499</p>
			</div>
			<button>立即支付</button>
		</div>
	</div>
	
</template>

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

<script>

	import AppHeader from '@/components/common/header'

	import utils from '@/widget/utils'

	import { mapGetters, mapActions } from 'vuex'

	export default {

		components: {
			AppHeader
		},

		data () {

			return {
				title: '提交订单',
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
				'updatePageView'
			]),
			pageAction (url) {

				this.$router.push(url)

			}
		},

		beforeCreate () {

			document.title = '提交订单'

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