<template>
	<div class="pageView">
		<AppHeader :title="title"></AppHeader>
		<div class="scroll-view-wrapper" :class="{'visibility':!pageView,'scroll_view_hidden': scrollView}">
			<div class="shop_detail">
				<Banner :bannerList="info.prod_imgs" v-show="prod_imgs.length"/>
			</div>
			<div class="shop_detail_info">
				<p>{{info.product_name}}</p>
				<div class="shop_detail_price">
					<div class="shop_info_price"><strike v-show="info.original_price">{{info.original_price | price}}</strike> <strong>￥{{info.price | price}}</strong></div>
					<span style="display: none;">奖励: <b>￥10.00</b></span>
				</div>
			</div>
			<div class="shop_size" v-if="relateProd.length" @click="updateIsOverlayVisible(1)">
				<span>选择规格</span>
				<div class="shop_size_info">
					<strong>已选择：{{selectProductName}}</strong>
					<svg class="ico order_arrow_right" aria-hidden="true">
						<use xlink:href="#icon-jiantou-right"></use>
					</svg>
				</div>
			</div>
			<div class="shop_detail_des">
				<h4>具体详情</h4>
				<div class="shop_detail_cont">
					<img v-for="item in desc" :src="item"/>
				</div>
			</div>
		</div>
		<div class="join_cart" :class="{'page_bottom':isWeixinIphoneX}">
			<div class="join_cart_icon" @click="pageAction('/cart')">
				<i class="order_cart_num" v-show="+cartNum">{{cartNum}}</i>
				<svg class="ico cart_icon" aria-hidden="true">
					<use xlink:href="#icon-gouwuche1"></use>
				</svg>
				<span>购物车</span>
			</div>
			<div class="join_cart_submit">
				<span @click="showFoot(false)">加入购物车</span>
				<strong @click="showFoot(true)">立即购买</strong>
			</div>
		</div>
		<ShopFoot
			:isSubmit="isSubmit"
			:price="info.price"
			:specImg="specImg"
			:selectProductName="selectProductName"
			:relateProd="relateProd"
			@selectProduct="selectProduct"
			@addShopCart="addShopCart"
		/>
	</div>
</template>

<script>

	import AppHeader from '@/components/common/header'

	import ShopFoot from '@/components/common/popup/shopFoot'

	import Banner from '@/components/detail/banner'

	import utils from '@/widget/utils'

	import * as Model from '@/model/detail'

	import { mapGetters, mapActions } from 'vuex'

	export default {

		components: {
			AppHeader,
			ShopFoot,
			Banner,
		},
		data () {
			const productId = this.$route.params.id

			return {
				specImg: '',
				isSubmit: false,
				title: '产品详情',
				productId: productId,
				info: {},
				desc: [],
				prod_imgs: [],
				selectProductName:'',
				selectProductId: '',
				relateProd: [],
				isWeixinIphoneX: utils.isWeixinIphoneX()
			}
		},
		mixin: ['loading'],
		computed: {

			...mapGetters({
				'pageView': 'getPageView',
				'cartNum': 'getCartNum',
				'scrollView': 'getScrollView'
			})
		},
		methods: {
			...mapActions([
				'updateIsOverlayVisible',
				'updatePageView',
				'updateCartNum'
			]),
			/**
			 * 添加商品购物车
			 * @param {Number} product_cnt
			 */
			addShopCart (product_cnt) {

				this.$showLoading()

				let cartNum = this.cartNum

				cartNum += 1

				Model.addShopCart({
					type: 'POST',
					data: {
						product_id: this.selectProductId,
						product_cnt
					}
				}).then((res) => {

					this.$hideLoading()

					const data = res.data

					if (data && res.status >= 1) {

						this.updateCartNum(cartNum)

						this.$toast('添加购物车成功')

					} else {

						this.$toast(res.msg)

					}

				}).catch((err) => {

					this.$toast('网络服务错误')

				})

			},

			pageAction (url) {

				this.$router.push(url)

			},

			/**
			 * 选择切换规格型号
			 * @param {Object} item
			 *
			 */
			selectProduct (item) {

				this.selectProductName = item.attributes
				this.selectProductId = item.prod_id
				this.info.price = item.price
				this.specImg =  item.spec_img

			},
			/**
			 * 显示加入购物车弹层或去购买
			 * @param {Boolean} val
			 */

			showFoot (val) {

				this.updateIsOverlayVisible(1)

				this.isSubmit = val

			},
			/***
			 * 获取默认商品的规格型号
			 * @param {Array} relateProd
			 */
			selectProductSize (relateProd) {

				var defaultIndex = 0

				var defaultShop = relateProd.forEach((item,index) => {

					if (item.prod_id == this.productId) {

						defaultIndex = index

					}

				})

				this.specImg =  relateProd[defaultIndex].spec_img

				this.selectProductName = relateProd[defaultIndex].attributes

				this.selectProductId = relateProd[defaultIndex].prod_id

			},
			/**
			 *
			 * 获取商品详情API
			 */
			getProductDetail () {

				Model.getProductDetail({
					type: 'GET',
					data: {
						product_id: this.productId
					},
					cache: true,
				}).then((res) => {

					this.updatePageView(true)
					this.$hideLoading()

					const data = res.data

					if (data && res.status >= 1) {

						const relateProd = data.relateProd
						this.info = data.prod
						this.desc = data.prod.desc ? JSON.parse(data.prod.desc) : []
						this.prod_imgs = data.prod.prod_imgs
						this.relateProd = relateProd

						if (relateProd.length) {
							this.selectProductSize(relateProd)
						} else {

							this.selectProductId = data.prod.id

						}

					} else {
						this.$toast(res.msg)
					}

				}).catch((err) => {

					this.$toast('网络服务错误')

				})

			}
		},

		beforeCreate () {

			document.title = '产品详情'

		},
		created () {

			this.updatePageView(false)

			this.getProductDetail()

			this.updateCartNum()

			this.showLoading()
		}
	}

</script>

<style lang="scss">

	.shop_info_price{

		strike {
			font-size: .26rem;
			color: #333;
		}

	}
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

		background: #fff;

		display: flex;

		justify-content: center;

		img{

			width: 7.5rem;

			height: 7.5rem;

		}

	}

	.shop_detail_cont{

		img{

			width:100%;

		}

	}

	.shop_detail_info{

		background:#fff;

		padding: .24rem .3rem 0;

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
