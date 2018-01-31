<template>
	<div class="shop_cart_bottom" :class="{'active':isOverlayVisible==1}">
		<div class="overlay_mask" @click="closePopup" :class="{'active':isOverlayVisible==1}"></div>
		<div class="select_popup" :class="{'active':isOverlayVisible == 1}">
			<div class="shop_foot_tit" v-if="relateProd.length">
				<h4>颜色选项</h4>
			</div>
			<div class="shop_foot_color" v-if="relateProd.length">
				<img class="shop_cate_color" :src="specImg"></img>
				<div class="shop_drop_menu">
					<div class="shop_drop_btn" @click="showFootMenu">
						<span>{{selectProductName}}</span>
						<svg class="ico order_arrow_bot" aria-hidden="true" v-show="!footMenu">
							<use xlink:href="#icon-jiantou-bottom"></use>
						</svg>
						<svg aria-hidden="true" class="ico order_arrow_bot" v-show="footMenu">
							<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-jiantou-top">
							</use>
						</svg>
					</div>
					<div class="shop_drop_list" id="scroller" :class="{'active':footMenu}">
						<ul class="shop_menu_list">
							<li v-for="(item,index) in relateProd" @click="selectSize(item)">{{item.attributes}}</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="cart_num_info">
				<span>￥{{totalPrice | price}}</span>
				<div class="cart_num">
					<div class="cart_num_item" @click="changeNum(-1)">
						<svg class="ico cart_btn_ico" aria-hidden="true">
							<use xlink:href="#icon-jian"></use>
						</svg>
					</div>
					<input type="tel" class="cart_input_num" @blur="inputProductNum" v-model.trim="proNumber"/>
					<div class="cart_num_item" @click="changeNum(1)">
						<svg class="ico cart_btn_ico" aria-hidden="true">
							<use xlink:href="#icon-jia2"></use>
						</svg>
					</div>
				</div>
			</div>
			<div class="shopFoot_submit" @click="submitOrder">
				<span class="submit_button">确认</span>
			</div>
		</div>
	</div>
</template>

<script>

	import * as Model from '@/model/detail'
	
	import utils from '@/widget/utils'

	import { mapGetters, mapActions } from 'vuex'

	export default {

		props: {

			isSubmit: {
				type: Boolean,
				default: false

			},
			relateProd: {
				type: Array,
				default: function () {
					return []
				}
			},
			selectProductName: {
				type: String,
				default: ''
			},
			price: {
				type: String,
				default: ''
			},
			specImg: {
				type: String,
				default: ''
			},
		},

		data () {

			return {

				proNumber: 1

			}

		},
		computed: {
			...mapGetters({
				'footMenu': 'getFootMenu',
				'isOverlayVisible': 'getIsOverlayVisible',
				'cartNum': 'getCartNum'
			}),

			totalPrice () {

				return this.price * this.proNumber

			}

		},

		watch: {

			footMenu () {

				/**
				 *
				 * 阻止弹层外的元素滚动
				 */
				document.querySelector('.overlay_mask').addEventListener('touchmove',(event) => {

					if (!utils.isPassive()) {
						
						event.preventDefault()
						
					}

					event.stopPropagation()

				},utils.isPassive() ? {passive: true} : false)

				document.getElementById('scroller').addEventListener('touchmove',(event) => {
					
					event.stopPropagation()
				},utils.isPassive() ? {passive: true} : false)
				document.getElementById('scroller').addEventListener('scroll',(event) => {

					event.stopPropagation()
				},utils.isPassive() ? {passive: true} : false)
			}
		},
			methods: {
				...mapActions([
					'updateFootMenu',
					'updateIsOverlayVisible',
					'updateScrollView'
				]),
				selectSize (item) {
	
					this.$emit('selectProduct',item)
	
					this.updateFootMenu(false)
					
					this.removeAppViewFixed()
	
					this.updateScrollView(false)
	
				},
	
				closePopup() {
	
					this.updateFootMenu(false)
	
					this.updateIsOverlayVisible(0)
	
			    this.removeAppViewFixed()
	
					this.updateScrollView(false)
	
				},
				showFootMenu () {
	
					const footMenu = !this.footMenu
	
					this.updateFootMenu(footMenu)
					
					this.updateScrollView(footMenu)
					
					this.appViewFixed()
	
				},
				
				removeAppViewFixed () {
					const appView = document.getElementById('app')
					appView.classList.remove('app_fixed')
					
				},
				appViewFixed () {
					
					const appView = document.getElementById('app')
	
					if (appView.classList.contains('app_fixed')){
	
						appView.classList.remove('app_fixed')
	
					} else {
	
						appView.classList.add('app_fixed')
					}
					
				},
				pageAction(url) {
	
					this.$router.push(url)
	
				},
	
				addCart () {
	
					this.$emit('addShopCart',this.proNumber)
	
				},
	
				submitOrder () {
	
					this.closePopup()
	
					if (this.isSubmit) {
	
						const id = this.$route.params.id
	
						const proNumber = this.proNumber
	
						window.location.href = `/order/submit?id=${id}&wareNumber=${proNumber}`
	
					} else {
	
						this.addCart()
	
					}
				},
	
				/**
				 *
				 * 改变商品的输入框数量
				 *
				 */
	
				inputProductNum () {
	
					const proNumber = parseInt(this.proNumber)
	
					if (proNumber <= 0 || !proNumber) {
	
						this.$toast('单件商品数量不能少于1件')
						this.proNumber = 1
						return
	
					}
	
				},
				/**
				 *
				 * 购物车中增加或者减少数量
				 * @param {String} val
				 *
				 */
	
				changeNum (val) {
	
					let proNumber = parseInt(this.proNumber)
	
					if (proNumber == 1 && val == -1) {
	
						this.$toast('单件商品数量不能少于1件')
						return
	
					}
	
					proNumber += val
					this.proNumber = proNumber
	
				}
	
			}

	}

</script>

<style lang="scss">
	
	.shop_cart_bottom{
		
		width:100%;
		
		height: 100%;
		
		position: fixed;
		
		z-index: -10;
		
		left:0;
		
		top:0;
		
		opacity: 0;
		
		transition: all .3s linear;
		
		&.active{
			
			opacity: 1;
			
			z-index:10;
			
		}
		
	}
	
	
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
		
		width: 5.5rem;
		
		background: #fff;
		
		position:absolute;
		
		left: -0.01rem;
		
		bottom: .66rem;
		
		max-height:0;
		height: 0;
		
		overflow:auto;
		transform: translate3d(0,0,0);
		
		transition: all 0.5s cubic-bezier(0.4, 0.01, 0.165, 0.99);
		
		border-left: .01rem solid #cecece;
		
		border-right: .01rem solid #cecece;
		
		&.active{
			
			height: 3.9rem;
			
			max-height: 3.9rem;
		}
		
	}
	
	.shop_menu_list{
		
		-webkit-overflow-scrolling: touch;
		background: #fff;
		
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
		
		margin-bottom: .4rem;
		
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
		
		width: 5.5rem;
		
		border: .01rem solid #cecece;
		
		padding: 0 .22rem;
		
		.order_arrow_bot{
			width: .25rem;
			height: .5rem;
			color: #c1c1c1;
			
		}
	}
	
	.shop_drop_btn{
		
		display: flex;
		height: .65rem;
		justify-content: space-between;
		
		align-items: center;
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
		
		margin-bottom: .4rem;
		
		display: flex;
		
		justify-content: space-between;
		
		align-items: center;
		
		.shop_cate_color{
			
			width: .9rem;
			
			height:.9rem;
			
			border-radius: 50%;
			
		}
		
		
	}

</style>