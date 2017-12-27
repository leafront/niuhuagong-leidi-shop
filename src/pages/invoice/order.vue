<template>
	<div class="pageView">
		<AppHeader :title="title"></AppHeader>
		<div class="scroll-view-wrapper" :class="{'visibility':!pageView}">
			<div class="history_detail_info">
				<div class="history_detail_tit" @click="updateIsOverlayVisible(2)">
					<h5>收件地址</h5>
					<svg aria-hidden="true" class="ico icon-bianji">
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-bianji">
						</use>
					</svg>
				</div>
				<div class="history_detail_cont">
					<div class="history_cont_txt">
						<span>订单信息：</span>
						<span>详细地址：</span>
					</div>
					<div class="history_cont_info">
						<p><i>{{info.name}}</i>{{info.mobile}}</p>
						<p>{{info.address}}</p>
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
						<p>{{info.order_number}}</p>
					</div>
				</div>
			</div>
			<div class="history_detail_info">
				<div class="history_detail_tit" @click="updateIsOverlayVisible(3)">
					<h5>发票信息</h5>
					<svg aria-hidden="true" class="ico icon-bianji">
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-bianji">
						</use>
					</svg>
				</div>
				<div class="history_detail_cont">
					<div class="history_cont_txt">
						<span>公司名称：</span>
						<span>纳税人识别号：</span>
						<span>发票金额：</span>
						<span>申请时间：</span>
					</div>
					<div class="history_cont_info">
						<p>{{info.company_name}}</p>
						<p>{{info.taxpayer_number}}</p>
						<p>{{info.invoice_amount | price}} 元</p>
						<p>{{info.create_time*1000 | dateFormat}}</p>
					</div>
				</div>
			</div>
		</div>
		<EditAddress :addressInfo = "info"/>
		<EditInvoice :invoiceInfo = "info"/>
		<div class="ui-submit-button" @click="applyInvoice">
			<span class="submit_button">确定</span>
		</div>
	</div>
</template>


<script>

	import AppHeader from '@/components/common/header'
	
	import EditAddress from '@/components/invoice/editAddress'
	
	import EditInvoice from '@/components/invoice/EditInvoice'

	import * as API from '@/api/invoice'

	import validate from '@/widget/validate'
	
	import store from '@/widget/store'

	import { mapActions, mapGetters } from 'vuex'

	export default {

		components: {
			AppHeader,
			EditAddress,
			EditInvoice
		},

		data () {

			let invoice_submit = store.get('INVOICE_SUBMIT')

			invoice_submit.order_id = JSON.stringify(invoice_submit.order_id)

			return {
				invoice_submit,
				info: {},
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
			 * 获取开票明细信息
			 */
			applyInvoice () {

				API.applyInvoice({
					type: 'POST',
					data: this.invoice_submit
				}).then((res) => {

					const data = res.data

					if (data && res.status >= 1) {

						this.info = data

					} else {

						this.$toast(res.msg)

					}

				})
			
			},

			/**
			 * 提交开票明细
			 */
			getInvoiceDetail () {

				API.getInvoiceDetail({
					type: 'GET',
					data: this.invoice_submit
				}).then((res) => {

					this.updatePageView(true)

					this.$hideLoading()

					const data = res.data

					if (data && res.status >= 1) {

						this.info = data

					} else {

						this.$toast(res.msg)

					}

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
			
			this.getInvoiceDetail()

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