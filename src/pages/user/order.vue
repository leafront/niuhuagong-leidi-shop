<template>
	<div class="pageView">
		<AppHeader :title="title"/>
		<div class="order_menu">
			<ul class="order_menu_list">
				<li v-for="(item,i) in orderTxt" :class="{'active': index == item.status}" @click="showTab(i)"><span>{{item.name}}</span></li>
			</ul>
		</div>
		<div class="scroll-view-wrapper order-view">
			<!--全部-->
			<template v-if="list && list.length">
				<div class="order_tab">
					<div class="order_item">
						<div class="order_item_tit">
							<span>订单号：561315641266600035</span>
							<strong>待发货</strong>
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
						<div class="order_money">
							<div class="order_reward">
								<svg class="ico ico_fanxian" aria-hidden="true">
									<use xlink:href="#icon-fanxian"></use>
								</svg>
								<span>奖励：<b>¥10.00</b></span>
							</div>
							<p>运费:¥1000.00</p>
							<div class="order_money_total">
								<strong>合计:</strong>
								<i>￥3853.2</i>
							</div>
						</div>
						<div class="order_info">
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
						<div class="order_money">
							<div class="order_reward">
							</div>
							<p>运费:¥1000.00</p>
							<div class="order_money_total">
								<strong>合计:</strong>
								<i>￥3853.2</i>
							</div>
						</div>
						<div class="order_status">
							<button class="order_btn_status" @click="showDialog">取消订单 </button>
							<button class="order_btn_status">提醒发货 </button>
						</div>
					</div>
					<div class="order_item">
						<div class="order_item_tit">
							<span>订单号：561315641266600035</span>
							<strong>待支付</strong>
						</div>
						<div class="order_info">
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
						<div class="order_money">
							<div class="order_reward">
							</div>
							<p>运费:¥1000.00</p>
							<div class="order_money_total">
								<strong>合计:</strong>
								<i>￥3853.2</i>
							</div>
						</div>
						<div class="order_status">
							<button class="order_btn_status" @click="updateOverlayVisible(true)">取消订单</button>
							<button class="order_btn_status">我要付款</button>
						</div>
					</div>
					<div class="order_item">
						<div class="order_item_tit">
							<span>订单号：561315641266600035</span>
							<strong>已取消</strong>
						</div>
						<div class="order_info">
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
						<div class="order_money">
							<div class="order_reward">
							</div>
							<p>运费:¥1000.00</p>
							<div class="order_money_total">
								<strong>合计:</strong>
								<i>￥3853.2</i>
							</div>
						</div>
						<div class="order_status">
							<button class="order_btn_status">删除订单</button>
						</div>
					</div>
					<div class="order_item">
						<div class="order_item_tit">
							<span>订单号：561315641266600035</span>
							<strong>已发货</strong>
						</div>
						<div class="order_info">
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
						<div class="order_money">
							<div class="order_reward">
							</div>
							<p>运费:¥1000.00</p>
							<div class="order_money_total">
								<strong>合计:</strong>
								<i>￥3853.2</i>
							</div>
						</div>
						<div class="order_status">
							<button class="order_btn_status">查看物流</button>
							<button class="order_btn_status">确认收货</button>
						</div>
					</div>
					<div class="order_item">
						<div class="order_item_tit">
							<span>订单号：561315641266600035</span>
							<strong>待评价</strong>
						</div>
						<div class="order_info">
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
						<div class="order_money">
							<div class="order_reward">
							</div>
							<p>运费:¥1000.00</p>
							<div class="order_money_total">
								<strong>合计:</strong>
								<i>￥3853.2</i>
							</div>
						</div>
						<div class="order_status">
							<button class="order_btn_status">我要评价</button>
						</div>
					</div>
					<div class="order_item">
						<div class="order_item_tit">
							<span>订单号：561315641266600035</span>
							<strong>已评价</strong>
						</div>
						<div class="order_info">
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
						<div class="order_money">
							<div class="order_reward">
							</div>
							<p>运费:¥1000.00</p>
							<div class="order_money_total">
								<strong>合计:</strong>
								<i>￥3853.2</i>
							</div>
						</div>
						<div class="order_status">
							<button class="order_btn_status">再次购买</button>
						</div>
					</div>
				</div>
			<!--全部-->
			</template>
			<template v-else>
				<div class="order_empty">
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

	import { mapActions } from 'vuex'
	
	export default {
		
		components: {

			Overlay,
			
			AppHeader
			
		},
		
		data () {
			
			return {
				
				list:[undefined],
				
				index: 0,
				title: '我的订单',
				refundIndex: 0,
				
				refundList:[{
					name: '我不想买了',
				},{
					name: '商品缺货'
				},{
					name: '收货信息有误'
				},{
					name: '商品数量/款式有误'
				},{
					name: '其他原因'
				}],
				
				orderTxt: [{
					name:'全部',
					status: 0
				},{
					name:'待支付',
					status: 1
				},{
					name:'待发货',
					status: 2
				},{
					name:'待收货',
					status: 3
				},{
					name:'待评价',
					status: 4
				}]
				
			}
			
		},

		beforeCreate () {

			document.title = '我的订单'

		},
		methods: {
			
			...mapActions([
				
				'updateOverlayVisible'
				
			]),

			showTab (index) {
				
				this.index = index;
				
			},

			selectRefund (index) {
				
				this.refundIndex = index
				
			},

			pageAction (url) {
				
				this.$router.push(url)
				
			},

			showDialog () {
				
				this.$dialog({
					content: '您确定要取消订单吗？',
					success () {
						
						console.log(111)
						
					}
				})
				
			},

			submitRefund () {
				
				this.updateOverlayVisible(false)
				
			}
		}
		
	}
	
</script>

<style lang="scss">
	
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
	
	.order_empty{
		
		padding-top: 40%;
		
		display:flex;
		
		align-items: center;
		
		justify-content: center;
		
		flex-direction: column;
		
		p{
			
			margin-top: .3rem;
			
			font-size: .28rem;
		}
		
		img{
			
			width: 1.96rem;
			
			height: 1.3rem;
			
		}
		
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
		
		height: .75rem;
		
		display: flex;
		
		padding: 0 .24rem;
		
		
		li{
			
			display: flex;
			
			justify-content: center;
			
			align-items: center;
			
			flex: 1;
			
			border-bottom: .04rem solid transparent;
			
			color: #252525;
			
			&.active {
				
				border-bottom: .04rem solid #008aec;
				
			}
			
		}
		
	}
	
</style>