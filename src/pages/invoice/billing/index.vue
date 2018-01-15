<template>
	<div class="pageView">
		<AppHeader :title="title"></AppHeader>
		<div class="scroll-view-wrapper" :class="{'visibility':!pageView}">
			<div class="billing">
				<template v-if="list && list.length">
					<div class="billing_item" v-for="(item,index) in list">
						<div class="billing_num" @click="selectItem(item)">
							<div class="ui-checked">
								<div class="ui-checked-radio" :class="{'active':selectBilling[item.id]}">
									<svg aria-hidden="true" class="ico ui-checked-ico">
										<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-gou">
										</use>
									</svg>
								</div>
							</div>
							<p>订单号：{{item.order_number}}</p>
							<strong>￥{{item.total_price | price}}</strong>
						</div>
						<div class="order_info" v-for="(cItem,cIndex) in item.product_list">
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
								<span>￥{{cItem.product_price | price}}</span>
								<strong>×１</strong>
							</div>
						</div>
					</div>
				</template>
				<template v-else>
					<div class="ui-empty">
						<img src="./images/order_empty_bg.png"/>
						<p>还没有购买商品</p>
					</div>
				</template>
			</div>
		</div>
			<div class="settlement" :class="{'page_bottom':isWeixinIphoneX}" v-if="list && list.length">
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
				<div class="sett_computed" @click="invoiceBillingSubmit">
					<span>结算<i v-show="selectNum">({{selectNum}})</i></span>
				</div>
			</div>
	</div>
</template>

<script>

	import AppHeader from '@/components/common/header'

	import { mapActions, mapGetters } from 'vuex'
	
	import store from '@/widget/store'
	
	import * as API from '@/api/invoice'
	
	import utils from '@/widget/utils'

	import common from '@/widget/common'

	export default {

		components: {
			AppHeader

		},

		data () {

			return {
				isWeixinIphoneX: utils.isWeixinIphoneX(),
				list: [],
				title: '我要开票',
				selectBilling: {}

			}
		},

		computed: {
			...mapGetters({
				'pageView':'getPageView'
			}),


			isAllSelect () {

				const list = this.list
				const selectBilling = this.selectBilling
				let isSelect = false

				if (list && list.length) {

					isSelect = list.every(({id}) => {
						return selectBilling[id]
					})

				}

				return isSelect

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
				const selectBilling = this.selectBilling

				this.list.forEach(({id}) => {

					if(selectBilling[id]) {
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

				const selectBilling = this.selectBilling
				let totalPrice = 0

				this.list.forEach(({total_price,id},index) => {

					if (selectBilling[id]) {
						totalPrice += parseInt(total_price)
					}

				})

				return totalPrice

			}
		},

		methods: {

			...mapActions([
				'updatePageView',
			]),
			pageAction(url) {

				this.$router.push(url)

			},

			selectItem ({id}) {

				this.selectBilling[id] = !this.selectBilling[id]

			},
			/**
			 * 获取我要开票列表
			 */

			getInvoiceBillingList () {

				API.getInvoiceBillingList({
					type: 'GET'
				}).then((res) => {

					const data = res.data

					if (data && res.status >= 1) {

						this.list = data

						const selectBilling = {}

						data.forEach((item) => {

							selectBilling[item.id] = false

						})

						this.selectBilling = selectBilling
						
						this.$hideLoading()

						this.updatePageView(true)

					} else {

						this.$hideLoading()

						this.$toast(res.msg)

					}
				})
			},

			invoiceBillingSubmit () {
				
				if (!this.selectNum) {
				
					this.$toast('请选择开票的商品')
					return
				
				}
				
				const { selectBilling, list } = this
				
				const order_id = []
				
				list.forEach((item) => {
					
					if (selectBilling[item.id]) {

						order_id.push(item.id)
					
					}
					
				})

				store.set('INVOICE_SUBMIT',{order_id})

				this.pageAction('/invoice/info?from=/user/address')
				
			},
			selectAll () {

				const list = this.list
				
				const selectBilling = this.selectBilling

				if (this.isAllSelect) {

					list.forEach(({id}) => {
						selectBilling[id] = false
					})

				} else {

					list.forEach(({id}) => {
						selectBilling[id] = true
					})

				}
			}
		},

		beforeCreate () {

			document.title = '我要开票'

		},

		created (){

			this.updatePageView(false)

			this.getInvoiceBillingList()

			common.showLoading.call(this)

		}

	}

</script>

<style lang="scss">
	
	@import '../../../styles/foot_bottom.scss';
	
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
	
	.order_info_wrapper{
		
		display: flex;
		
	}
	
	.order_info{
		
		padding: .4rem .3rem;
		
		display: flex;
		
		border-bottom: 1px solid #f1f1f1;
		
		justify-content: space-between;
		
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
	
	.billing_num{
		
		display: flex;
		
		height: .84rem;
		
		border-bottom: .01rem solid #ededed;
		
		align-items: center;
		
		p{
			
			color: #9d9d9d;
			
		}
		strong{
			
			color: #f65253;
			
			font-size: .28rem;
			
			flex:1;
			
			text-align: right;
			
		}
		
	}
	
	.billing_item {
	
		margin-bottom: .24rem;
		
		background: #fff;
		
		padding: 0 .2rem;
		
	}


</style>