<template>
	<div class="pageView">
		<AppHeader :title="title"></AppHeader>
		<div class="scroll-view-wrapper" :class="{'visibility':!pageView}">
			<div class="history_detail_info">
				<div class="history_detail_tit" @click="addressAction">
					<h5>收件地址</h5>
					<svg aria-hidden="true" class="ico icon-bianji">
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-bianji">
						</use>
					</svg>
				</div>
				<div class="history_detail_cont">
					<div class="history_cont_txt">
						<span>收件人：</span>
						<span>详细地址：</span>
					</div>
					<div class="history_cont_info" v-if="recvInfo">
						<p><i>{{recvInfo.receiver}}</i>{{recvInfo.mobile}}</p>
						<p>{{recvInfo.province_name + ' ' + recvInfo.city_name  + ' ' + recvInfo.area_name + ' ' +  recvInfo.address}}</p>
					</div>
				</div>
			</div>
			<div class="history_detail_info">
				<div class="history_detail_tit">
					<h5>订单信息</h5>
				</div>
				<div class="history_detail_cont">
					<div class="history_cont_txt">
						<span>订单编号：</span>
					</div>
					<div class="history_cont_info">
						<p v-for="(item,index) in ordersInfo">{{item.order_code}}</p>
					</div>
				</div>
			</div>
			<div class="history_detail_info">
				<div class="history_detail_tit" @click="invoiceAction">
					<h5>发票信息</h5>
					<svg aria-hidden="true" class="ico icon-bianji">
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-bianji">
						</use>
					</svg>
				</div>
				<div class="history_detail_cont">
					<div class="history_cont_txt">
						<span>公司名称：</span>
						<span v-if="invoiceInfo.taxpayer_number">纳税人识别号：</span>
						<span>发票金额：</span>
					</div>
					<div class="history_cont_info">
						<p>{{invoiceInfo.company_name || invoiceInfo.name}}</p>
						<p v-if="invoiceInfo.taxpayer_number">{{invoiceInfo.taxpayer_number}}</p>
						<p>{{invoiceInfo.invoiceMoeny | price}} 元</p>
					</div>
				</div>
			</div>
		</div>
		<div class="ui-submit-button" @click="applyInvoice">
			<span class="submit_button">确定</span>
		</div>
	</div>
</template>
<script>

	import AppHeader from '@/components/common/header'

	import * as API from '@/api/invoice'

	import validate from '@/widget/validate'
	
	import store from '@/widget/store'

	import { mapActions, mapGetters } from 'vuex'

	export default {

		components: {
			AppHeader
		},

		data () {

			let invoice_submit = store.get('INVOICE_SUBMIT')

			invoice_submit.order_id = JSON.stringify(invoice_submit.order_id)

			return {
				invoice_submit,
				invoiceInfo: {},
				recvInfo: {},
				ordersInfo: [],
				title: '开票明细'
			}
		},
		computed: {
			...mapGetters({
				'pageView':'getPageView'
			})
		},

		methods: {
			...mapActions([
				'updatePageView',
				'updateIsOverlayVisible',
				'updateSelectCity'
			]),
			
			/**
			 * 修改地址
			 */
			
			addressAction () {

				this.pageAction(`/user/address?from=/invoice/order`)
				
			},
			
			/**
			 *
			 * 修改发票
			 */
			
			invoiceAction () {

				this.pageAction(`/invoice/info?from=/invoice/order`)
				
			},

			/**
			 * 提交开票明细信息
			 */
			applyInvoice () {

				API.applyInvoice({
					type: 'POST',
					data: this.invoice_submit
				}).then((res) => {

					const data = res.data

					if (data && res.status >= 1) {

						this.$toast(res.msg)
						
						setTimeout(() => {
							
							this.pageAction('/invoice')
						
						},2000)

					} else {

						this.$toast(res.msg)

					}

				}).catch((err) => {

					this.$toast('网络服务错误')

				})
			
			},

			/**
			 * 获取开票明细
			 */
			getInvoiceInfo () {

				API.invoiceInfo({
					type: 'GET',
					data: this.invoice_submit
				}).then((res) => {

					this.updatePageView(true)

					this.$hideLoading()

					const data = res.data

					if (data && res.status >= 1) {

						this.ordersInfo = data.ordersInfo
						this.invoiceInfo = data.invoiceInfo
						this.recvInfo = data.recvInfo

					} else {

						this.$toast(res.msg)

					}

				}).catch((err) => {

					this.$toast('网络服务错误')

				})

			},
			pageAction(url) {

				this.$router.push(url)

			}
		},

		beforeCreate () {

			document.title = '开票明细'

		},

		created (){

			this.updatePageView(false)

			this.$showLoading()
			
			this.getInvoiceInfo()

		},
		/**
		 * 销毁组件选中状态
		 *
		 */
		destroyed:function(){

			this.updateSelectCity({name:'',result:{}});
		}

	}

</script>

<style lang="scss">
	
	.history_cont_txt{
		
		width: 1.7rem;
		
		display: flex;
		flex-direction: column;
		
	}
	
	.history_cont_info{
		
		p{
			
			i{
				padding-right: .66rem;
				
			}
			
		}
		
	}
	
	.history_detail_cont{
		
		padding:.3rem .2rem;
		
		display: flex;
		
		color: #9d9d9d;
		
		span,p{
			line-height: .4rem;
		}
		
	}
	
	.history_detail_info{
		
		background: #fff;
		
		margin-bottom: .24rem;
		
		
	}
	
	.history_detail_tit{
		
		height: .75rem;
		
		border-bottom: .01rem solid #ededed;
		
		padding-left: .2rem;
		
		display: flex;
		
		align-items: center;
		
		justify-content: space-between;
		
		h5{
			
			font-size: .28rem;
			
		}
		.icon-bianji{
			
			width: .25rem;
			height: .25rem;
			color: #9d9d9d;
			
			margin-right: .2rem;
			
		}
		
	}

</style>