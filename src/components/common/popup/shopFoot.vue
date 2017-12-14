<template>
		<div class="select_popup" :class="{'active':isOverlayVisible == 1}">
			<div class="shop_foot_tit">
				<h4>颜色选项</h4>
			</div>
			<div class="shop_foot_color">
				<span class="shop_cate_color"></span>
				<div class="shop_drop_menu" @click="showFootMenu">
					<span>85杏仁黄</span>
					<svg class="ico order_arrow_bot" aria-hidden="true" v-show="!footMenu">
						<use xlink:href="#icon-jiantou-bottom"></use>
					</svg>
					<svg aria-hidden="true" class="ico order_arrow_bot" v-show="footMenu">
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-jiantou-top">
						</use>
					</svg>
					<div class="shop_drop_list" :class="{'active':footMenu}">
						<ul class="shop_menu_list">
							<li>85杏仁黄</li>
							<li>85杏仁黄</li>
							<li>85杏仁黄</li>
							<li>85杏仁黄</li>
							<li>85杏仁黄</li>
							<li>85杏仁黄</li>
							<li>85杏仁黄</li>
							<li>85杏仁黄</li>
							<li>85杏仁黄</li>
							<li>85杏仁黄</li>
							<li>85杏仁黄</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="cart_num_info">
				<span>￥{{totalPrice | toThousands}}</span>
				<div class="cart_num">
					<div class="cart_num_item" @click="changeNum(-1)">
						<svg class="ico cart_btn_ico" aria-hidden="true">
							<use xlink:href="#icon-jian"></use>
						</svg>
					</div>
					<input type="tel" class="cart_input_num" v-model="cartNum"/>
					<div class="cart_num_item" @click="changeNum(1)">
						<svg class="ico cart_btn_ico" aria-hidden="true">
							<use xlink:href="#icon-jia2"></use>
						</svg>
					</div>
				</div>
			</div>
			<div class="shopFoot_submit" @click="updateIsOverlayVisible(2)">
				<span class="submit_button">确认购买</span>
			</div>
		</div>
</template>

<script>
	
	
	import { mapGetters, mapActions } from 'vuex'
	
	export default {
		
		data () {
			
			return {
				
				price: 999,
				
				cartNum: 1
				
			}
			
		},
		computed: {
			...mapGetters({
				'footMenu': 'getFootMenu',
				'isOverlayVisible': 'getIsOverlayVisible'
			}),
			
			totalPrice () {
				
				return this.price * this.cartNum
				
			}

		},
		
		methods: {
			...mapActions([
				'updateFootMenu',
				'updateIsOverlayVisible'
			]),

			closeShopFoot () {

				this.updateFootMenu(false)
				
				this.updateIsOverlayVisible(0)
			},
			showFootMenu () {

				const footMenu = !this.footMenu
				this.updateFootMenu(footMenu)

			},
			
			
			changeNum (val) {
				
				let cartNum = parseInt(this.cartNum)

				if (cartNum == 1 && val == -1) {

					this.$toast('单件商品数量不能少于1件')
					return

				}

				cartNum += val
				this.cartNum = cartNum

			}

		}
		
	}
	
</script>

<style lang="scss">
	
	.shopFoot_submit{
		
		padding: 0 .2rem .4rem;
		
		display: flex;
		
		align-items: center;
		
		span{
			
			background: #f65253;
			
		}
	}
	
	.cart_num{
		
		display: flex;
		
		position:relative;
		
		.cart_input_num{
			
			width: 1.35rem;
			
			height: .48rem;
			
			text-align: center;
			
		}
		
	}
	.shop_drop_list{
		
		width:100%;
		
		background: #fff;
		
		position:absolute;
		
		left: 0;
		
		bottom: .65rem;
		
		height: 0;
		
		overflow: auto;
		
		transform: translate3d(0,0,0);
		
		transition: all 0.5s cubic-bezier(0.4, 0.01, 0.165, 0.99);
		
		&.active{
			
			height: 3.9rem;
			
		}
		
	}
	
	.shop_menu_list{
		
		border-left: .01rem solid #cecece;
		
		border-right: .01rem solid #cecece;
		
		li{
			
			
			height: .65rem;
			
			line-height: .65rem;
			
			padding-left: .22rem;
			
			border-top: .01rem solid #cecece;
			
		}
		
	}
	
	.cart_num_item{
		
		width: .48rem;
		
		height: .48rem;
		
		background: #e6e6e6;
		
		display: flex;
		
		align-items: center;
		
		justify-content: center;
		
		.cart_btn_ico{
		
			width: .32rem;
			
			height: .32rem;
			
			color:#a4a4a4;
		
		}
		
	}
	
	.cart_num_info{
		
		margin: .4rem 0;
		
		padding: .4rem .4rem;
		
		border-top: .01rem solid #e6e6e6;
		
		border-bottom: .01rem solid #e6e6e6;
		
		display: flex;
		
		justify-content: space-between;
		
		span{
			
			font-size: .28rem;
			
		}
	}
	
	
	.shop_drop_menu{
		
		position: relative;
		
		display: flex;
		
		width: 5.5rem;
		
		height: .65rem;
		
		justify-content: space-between;
		
		align-items: center;
		
		border: .01rem solid #cecece;
		
		padding: 0 .22rem;
		
		.order_arrow_bot{
			width: .25rem;
			height: .5rem;
			color: #c1c1c1;
			
		}
	}
	
	.shop_foot_tit{
		
		padding-left: .4rem;
		
		height: .9rem;
		
		display: flex;
		
		align-items: center;
		
		h4{
			font-size: .28rem;
		}
	}
	
	.shop_foot_color{
		
		padding: 0 .4rem;
		
		display: flex;
		
		justify-content: space-between;
		
		align-items: center;
		
		.shop_cate_color{
		
			width: .9rem;
			
			height:.9rem;
			
			border-radius: 50%;
			
			background: #e5c18d;
		
		}
		
		
	}
	
</style>