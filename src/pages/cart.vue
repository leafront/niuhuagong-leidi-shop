<template>
	<div class="pageView">
		<AppHeader :title="title"/>
		<div class="cart_tit" :class="{'visibility':!pageView}">
			<h5>我的购物车<i v-show="selectNum">（{{selectNum}}）</i></h5>
			<span v-show="isDelete" @click="deleteCart">删除</span>
		</div>
		<div class="scroll-view-wrapper cart-view" id="appView" :class="{'visibility':!pageView}">
			<div class="cart_list">
				<LazyLoad :list="list" :options="{ele:'lazyLoad_img',scrollEle: 'appView'}">
					<div class="cart_list_item" v-for="(item,index) in list">
						<div class="ui-checked" @click="selectItem(item)">
							<div class="ui-checked-radio" :class="{'active': cartList[item.id]}">
								<svg class="ico ui-checked-ico"  aria-hidden="true">
									<use xlink:href="#icon-gou"></use>
								</svg>
							</div>
						</div>
						<div class="cart_img" @click="pageAction('/detail/'+item.product_id)">
							<div class="lazyLoad_img" :data-src="item.product_img"/>
						</div>
						<div class="cart_info">
							<p>{{item.product_name}}</p>
							<div class="cart_info_txt">
								<strong>￥{{item.price | price}}</strong>
								<div class="cart_num">
									<div class="cart_reduce" @click.stop="changeCart(item,index,-1)">
										<i></i>
									</div>
									<input type="tel" class="cart_num_input" @blur="changeNum(item,index)" v-model.trim="numList[index]"/>
									<div class="cart_add" @click.stop="changeCart(item,index,1)">
										<i class="ico1"></i>
										<i class="ico2"></i>
									</div>
								</div>
							</div>
						</div>
					</div>
				</LazyLoad>
			</div>
			<template v-if="list.length == 0">
				<div class="cart_empty" :class="{'visibility':!pageView}">
					<img src="./images/cart_empty.png"/>
					<p>购物车空空如也</p>
				</div>
			</template>
		</div>
		<div class="settlement" :class="{'visibility':!pageView}" v-show="list && list.length">
			<div class="sett_item">
				<div class="sett_item_select" @click="selectAll">
					<div class="ui-checked">
						<div class="ui-checked-radio" :class="{'active':isAllSelect}">
							<svg class="ico ui-checked-ico"  aria-hidden="true">
								<use xlink:href="#icon-gou"></use>
							</svg>
						</div>
					</div>
					<i>全选</i>
				</div>
				<div class="sett_total">
					<span>合计：</span>
					<strong>￥{{totalPrice | price}}</strong>
				</div>
			</div>
			<div class="sett_computed" @click="submitCart">
				<span>结算<i v-show="selectNum">({{selectNum}})</i></span>
			</div>
		</div>
		<AppFooter/>
	</div>
</template>

<script>

	import LazyLoad from '@/components/widget/lazyLoad'

	import AppFooter from '@/components/common/footer'

	import AppHeader from '@/components/common/header'

	import * as Model from '@/model/cart'

	import { mapActions, mapGetters } from 'vuex'

	export default {
		components: {
			AppHeader,
			LazyLoad,
			AppFooter
		},
		data () {

			return {
				title:'购物车',
				cartList:{},
				list: [],
				numList:[]
			}
		},
		mixin: ['loading'],
		methods: {
			...mapActions([
				'updatePageView',
				'updateIsOverlayVisible'
			]),

			pageAction (url) {

				this.$router.push(url)

			},

			/**
			 * 提交购物车中的商品去结算
			 *
			 */
			submitCart () {

				if (!this.selectNum) {

					this.$toast('请选择购物车中的商品')

					return

				}
				window.location.href = '/order/submit?from=cart'
			},
			/**
			 * 选中购物车中的一项
			 * @param {Object} item
			 *
			 */

			selectItem ({id}) {

				this.cartList[id] = this.cartList[id] ? 0 : 1

				let data = {}

				data[id] = this.cartList[id]

				this.checkCartProd(data)

			},

			/**
			 * 购物车中的增加和减少
			 * @param {Number} index
			 * @param {Number} val
			 */

			changeCart ({id},index,val) {

				let cartNum = parseInt(this.numList[index])

				if (cartNum == 1 && val == -1) {
					this.$toast('单件商品数量不能少于1件')
					return

				}

				cartNum += val

				this.numList.splice(index,1,cartNum)

			  this.changeNumCart(id,cartNum)

			},

			/**
			 * 全选或者全不选的实现
			 *
			 * @param null
			 *
			 */

			selectAll () {

				const list = this.list
				const cartList = this.cartList

				if (this.isAllSelect) {

					list.forEach(({id}) => {
						cartList[id] = 0
					})

				} else {

					list.forEach(({id}) => {
						cartList[id] = 1
					})
				}
				this.checkCartProd(this.cartList)
			},

			/**
			 * 删除购物车中商品
			 *
			 * @param null
			 */

			deleteItem () {

				const cartList = this.cartList
				const list = this.list

				for (let len = list.length, i = len - 1; i >=0; i--) {

					if (cartList[list[i].id]) {
						this.numList.splice(i,1)
						this.list.splice(i,1)
					}

				}
			},
			/**
			 *
			 * 购物车中改变商品的输入框数量
			 * @param {Object} item
			 * @param {Number} index
			 */

			changeNum ({id},index) {

				const cartNum = parseInt(this.numList[index])

				if (cartNum <= 0 || !cartNum) {

					this.$toast('单件商品数量不能少于1件')
					this.numList.splice(index,1,1)
					return

				}

				this.changeNumCart(id,cartNum)

			},

			/**
			 * 删除购物车
			 *
			 */

			deleteCart () {

				const list = this.list

				const cartList = this.cartList

				let result = []

				list.forEach((item) => {

					if (cartList[item.id]) {
						result.push(item.id)
					}

				})

				Model.deleteCart({
					type: 'POST',
					data:{
						cpordIds: JSON.stringify(result)
					}
				}).then((res) => {

					const data = res.data

					if (data && res.status >= 1) {

						this.$toast('删除成功')

						this.deleteItem()

					} else {

						this.$toast(res.msg)

					}
				}).catch((err) => {

					this.$toast('网络服务错误')

				})

			},

			/**
			 * 添加商品购物车
			 * @param {String} cprod_id
			 * @param {String} product_cnt
 			 *
			 */

			changeNumCart (cprod_id,product_cnt) {

				Model.changeNumCart({
					type: 'POST',
					data:{
						cprod_id,
						product_cnt
					}
				}).then((res) => {

					const data = res.data

					if (!data && res.status < 1) {

						this.$toast(res.msg)

					}

				}).catch((err) => {

					this.$toast('网络服务错误')

				})
			},
			/**
			 *  设置默认初始状态
			 *  @param {Array} data
			 */

			setCartList (data) {

				const cartList = {}
				let  numList = []

				data.forEach((item) => {

					cartList[item.id] = parseInt(item.is_check)
					numList.push(item.product_cnt)

				})

				this.cartList = cartList
				this.numList = numList

			},

			/**
			 * 用户勾选购物车选中
			 * @param {Object}
			 */

			checkCartProd (cprod_isCheck) {
				Model.checkCartProd({
					type: 'POST',
					data: {
						cprod_isCheck : JSON.stringify(cprod_isCheck)

					}
				}).then((res) => {

					const data = res.data

					if (data && res.status <= 0) {

						this.$toast(res.msg)
					}

				}).catch((err) => {

					this.$toast('网络服务错误')

				})

			},

			/**
			 * 获取购物车列表
			 *
			 */

			getCartList () {

				Model.getCartList({
					type: 'GET'
				}).then((res) => {

					const data = res.data
					this.updatePageView(true)
					this.$hideLoading()

					if (data && res.status >= 1) {
						this.list = data
						this.setCartList(data)

					} else {

						this.$toast(res.msg)

					}

				})
			}

		},

		computed:{

			...mapGetters({
				'pageView':'getPageView'
			}),

			/**
			 * 判断购物车中的商品是否全选
			 *
			 * @param null
			 *
			 * @returns {Boolean} isSelect
			 */

			isAllSelect () {

				const list = this.list
				const carList = this.cartList
				let isSelect = false

				if (list && list.length) {

					isSelect = list.every(({id}) => {
						return carList[id]
					})

				}

				return isSelect

			},

			/**
			 * 判断购物车中的商品是否有一个选中
			 * 如有，则可以显示删除按钮
			 *
			 * @param null
			 *
			 * @returns {Boolean} isDelete
			 */

			isDelete () {

				const list = this.list
				const cartList = this.cartList

				const isDelete = list.some(({id}) => {
					return cartList[id]
				})

				return isDelete

			},

			/**
			 *
			 * 选中购物车中的商品数量
			 *
			 * @param null
			 *
			 * @returns {Number} num
			 */

			selectNum () {

				let num = 0
				const cartList = this.cartList

				this.list.forEach(({id}) => {

					if(cartList[id]) {
						num ++
					}
				})

				return num

			},

			/**
			 *
			 * 购物车中的商品总价计算
			 *
			 * @param null
			 *
			 * @returns {Number} totalPrice
			 */

			totalPrice () {

				const cartList = this.cartList
				const numList = this.numList
				let totalPrice = 0

				this.list.forEach(({price,id},index) => {

					if (cartList[id]) {
						totalPrice += numList[index] * price
					}

				})

				return totalPrice

			}

		},

		beforeCreate () {

			document.title = '用户购物车'

		},

		created () {

			this.updatePageView(false)

			this.getCartList()
			this.showLoading()

		}

	}

</script>

<style lang="scss">


	@import '../styles/foot_bottom.scss';

	.cart_empty{

		padding-top: 50%;

		display: flex;

		align-items: center;

		justify-content: center;

		flex-direction: column;

		p{

			margin-top: .44rem;

			font-size: .28rem;

		}

	}

	.sett_total{

		padding-left: .3rem;

		font-size: .28rem;

		display: flex;

		flex:1;

		strong{

			color:#f65253;

		}

	}

	.sett_computed{

		height: 1.02rem;

		width: 2.5rem;

		display:flex;

		align-items: center;

		justify-content: center;

		background: #ff3c3c;

		span{

			font-size: .38rem;

			color: #fff;

		}

	}

	.settlement{

		height: 1.02rem;

		display:flex;

		align-items: center;

		background: #fff;

	}

	.sett_item{

		flex:1;

		display: flex;

		padding-left: .3rem;

		height: 1.02rem;

		align-items: center;

		justify-content: space-between;

		border-top: .01rem solid #d6d6d6;

		i{

			font-size: .28rem;

			color: #252525;

		}
	}

	.sett_item_select{

		height: 1.02rem;

		display: flex;

		padding-right: .4rem;

		align-items: center;

	}

	.cart-view{

		background: #f6f6f6;

	}

	.cart_info_txt{

		display:flex;

		justify-content: space-between;

		strong{

			color: #f65253;

		}

	}

	.cart_reduce{

		display:flex;

		width: .6rem;

		height: .5rem;

		justify-content: center;

		align-items: center;

		border-right: .01rem solid #cecece;

		i{

			width: .2rem;

			height: .03rem;

			background: #c1c1c1;

		}

	}

	.cart_add{

		width: .6rem;

		height: .5rem;

		border-left: .01rem solid #cecece;

		position:relative;

		.ico1{
			width: .2rem;

			height: .03rem;

			background: #c1c1c1;

			display:block;

			position:absolute;

			left: 50%;

			top: 50%;

			transform: translate(-50%,-50%);

		}
		.ico2{

			width: .03rem;

			height: .2rem;

			background: #c1c1c1;

			display:block;


			position:absolute;

			left: 50%;

			top: 50%;

			transform: translate(-50%,-50%);
		}

	}

	.cart_num{

		display: flex;

		align-items: center;

		border: .01rem solid #cecece;

		height: .5rem;

		.cart_num_input{

			font-size: .24rem;

			color: #252525;

			width: .8rem;

			text-align:center;


		}

	}

	.cart_info{

		flex:1;

		height: 1.3rem;

		p{

			line-height: .44rem;

			padding-bottom: .1rem;
		}

	}


	.cart_tit{

		background: #fff;

		height: .92rem;

		display:flex;

		align-items: center;

		justify-content: space-between;

		padding-left: .3rem;

		font-size: .28rem;

		color:#252525;

		span{

			height: .92rem;

			line-height: .92rem;

			padding-right: .3rem;

			padding-left: 1rem;

		}

		h5{
			font-weight: 500;
			font-size: .28rem;
		}

	}

	.cart_list{

		margin-top: .24rem;

		background: #fff;


	}

	.cart_list_item{

		padding: 0.38rem 0.3rem 0.38rem 0;

		display: flex;

		border-bottom:.01rem solid #ededed;

		&:last-child{
			border-bottom:0;
		}

	}

	.cart_img{

		padding-right: .3rem;

		.lazyLoad_img{

			width: 1.3rem;
			height: 1.3rem;

			background-color: #f4f4f8;

			background-size: 100% auto;
		}
	}
</style>
