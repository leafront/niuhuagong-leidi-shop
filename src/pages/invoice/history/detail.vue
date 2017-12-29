<template>
	<div class="pageView">
		<AppHeader :title="title"></AppHeader>
		<div class="scroll-view-wrapper" :class="{'visibility':!pageView}">
			<div class="history_detail_info">
				<div class="history_detail_tit">
					<h5>收件信息</h5>
				</div>
				<div class="history_detail_cont">
					<div class="history_cont_txt">
						<span>收件人：</span>
						<span>详细地址：</span>
					</div>
					<div class="history_cont_info">
						<p><i>{{info.name}}</i>{{info.mobile}}</p>
						<p>{{info.province_name + ' ' + info.city_name + ' ' + info.area_name + ' ' + info.address}}</p>
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
				<div class="history_detail_tit">
					<h5>发票信息</h5>
				</div>
				<div class="history_detail_cont">
					<div class="history_cont_txt">
						<span>发票抬头：</span>
						<span>纳税人识别号：</span>
						<span>发票金额：</span>
						<span>申请时间：</span>
					</div>
					<div class="history_cont_info">
						<p>{{info.company_name}}</p>
						<p>{{info.taxpayer_number}}</p>
						<p><strong>{{info.invoice_amount | price}}</strong> 元</p>
						<p>{{info.create_time*1000 | dateFormat}}</p>
					</div>
				</div>
			</div>
			
			<div class="history_detail_info">
				<div class="history_detail_tit">
					<h5>发票号码</h5>
				</div>
				<div class="history_detail_cont">
					<div class="history_cont_txt">
						<span>普通发票：</span>
					</div>
					<div class="history_cont_info">
						<p><strong>{{info.invoice_number}}</strong></p>
					</div>
				</div>
			</div>
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
				info: {},
				title: '开票明细',

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
			]),
			pageAction(url) {

				this.$router.push(url)

			},
			/**
			 *
			 * 获取发票历史详情
			 */

			getInvoiceHistoryDetail () {
				
				const id  = this.$route.params.id

				API.getInvoiceHistoryDetail({
					type: "GET",
					data: {
						id
					}
				}).then((res) => {

					this.updatePageView(true)

					this.$hideLoading()

					const data = res.data

					if (data && res.status >= 1) {

						this.info = data

					} else {

						this.$toast(res.msg)

					}
				}).catch((err) => {

					this.$toast('网络服务错误')

				})
			}
		},
		
		beforeCreate () {
			
			document.title = '开票明细'
			
		},

		created (){

			this.updatePageView(false)

			this.$showLoading()
			
			this.getInvoiceHistoryDetail()

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
			strong{
			
				color: #f65253;
				
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
		
		h5{
			
			font-size: .28rem;
			
		}
		
	}

</style>