<template>
	<div class="pageView">
		<AppHeader :title="title"></AppHeader>
		<div class="scroll-view-wrapper" :class="{'visibility':!pageView}">
			<template v-if="list && list.length">
				<div class="billing_history">
					<div class="history_item" v-for="(item,index) in list" @click="pageAction('/invoice/history/'+item.order_id)">
						<div class="history_item_tit">
							<svg aria-hidden="true" class="ico time-icon">
								<use xlink:href="#icon-time">
								</use>
							</svg>
							<p>{{item.times*1000 | dateFormat}}</p>
							<div class="history_status">
								<span>{{invoiceTxt[item.status]}}</span>
								<svg class="ico history_right_icon" aria-hidden="true">
									<use xlink:href="#icon-jiantou-right"></use>
								</svg>
							</div>
						</div>
						<div class="history_item_cont">
							<div class="history_billing_type">
								<strong>￥{{item.price | price}}</strong>
								<span>{{invoiceType[item.type]}}</span>
							</div>
							<p>订单号: {{item.order_number}} </p>
						</div>
					</div>
				</div>
			</template>
			<template v-else>
				<div class="ui-empty">
					<img src="./images/order_empty_bg.png"/>
					<p>还没有历史开票记录</p>
				</div>
			</template>
		</div>
	</div>
</template>


<script>

	import AppHeader from '@/components/common/header'

	import { mapActions, mapGetters } from 'vuex'

	import * as API from '@/api/invoice'

	export default {

		components: {
			AppHeader
		},
		data () {

			return {
				list: [],
				title: '历史开票记录',
				invoiceTxt: {
					'1': '已申请',
					'2': '已开票'
				},
				invoiceType: {
					"1": "个人",
					"2": "企业普票",
					"3": "企业增票"
				}
			}
		},
		mixin: ['loading'],
		computed: {
			...mapGetters({
				'pageView':'getPageView'
			})
		},

		beforeCreate () {

			document.title = '历史开票记录'

		},

		methods: {

			...mapActions([
				'updatePageView',
			]),
			pageAction(url) {

				this.$router.push(url)

			},
			/**
			 *
			 * 获取发票历史列表
			 */

			getInvoiceHistoryList () {
				
				API.getInvoiceHistoryList({
					type: "GET"
				}).then((res) => {

					const data = res.data

					if (data && res.status >= 1) {

						this.updatePageView(true)

						this.$hideLoading()

						this.list = data

					} else {

						this.$hideLoading()

						this.$toast(res.msg)


					}
				})
			}
		},

		created (){

			this.updatePageView(false)
			
			this.getInvoiceHistoryList()

			this.showLoading()

		}

	}

</script>

<style lang="scss">

	
	.history_billing_type{
		
		display: flex;
		
		align-items: center;
		
		padding-bottom: .3rem;
		
		strong{
			
			color: #f65253;
			
			font-size: .28rem;
			
			font-weight: bold;
			
			padding-right: .25rem;
			
			border-right: .01rem solid #ededed;
			
		}
		span{
			
			padding-left: .25rem;
			
		}
		
	}
 
	.billing_history{
		
		padding: .2rem  .2rem 0;
	}
	
	.history_item_cont{
		
		padding: .32rem .22rem;
		
		p{
		
			color: #9d9d9d;
		
		}
		
	}
	
	.history_status{
		
		display: flex;
		
		flex:1;
		
		align-items: center;
		
		justify-content: flex-end;
		
		span{
			
			color: #1ba0e5;
			
		}
		
		.history_right_icon{
			margin-left: .1rem;
			width: .3rem;
			height: .6rem;
			color: #9d9d9d;
		
		}
		
	}
	
	.history_item{
		
		background: #fff;
		
		margin-bottom: .24rem;
		
	}
	.history_item_tit{
		
		padding:0 .2rem;
		
		height: .8rem;
		
		display: flex;
		
		align-items: center;
		
		border-bottom: .01rem solid #ededed;
		
		
		.time-icon{
			
			width: .25rem;
			
			height: .25rem;
			
			color: #252525;
		
		}
		p{
			color: #9d9d9d;
			padding-left: .15rem;
		}
		
	}

</style>