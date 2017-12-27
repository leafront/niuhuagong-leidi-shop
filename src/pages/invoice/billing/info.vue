<template>
	<div class="pageView">
		<AppHeader :title="title"></AppHeader>
		<div class="scroll-view-wrapper" :class="{'visibility':!pageView}">
			<div class="address_title_wrapper">
				<div class="address_title">
					<h5>开票资料</h5>
				</div>
			</div>
			<div class="billing_address_item" v-for="(item,index) in list">
				<div class="ui-checked" @click="selectItem(item.id)">
					<div class="ui-checked-radio" :class="{'active':billingAddress[item.id]}">
						<svg aria-hidden="true" class="ico ui-checked-ico">
							<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-gou">
							</use>
						</svg>
					</div>
				</div>
				<div class="billing_address_info">
					<div class="billing_address_txt">
						<span>{{invoiceType[item.type]}}</span>
					</div>
					<p>{{item.name || item.company_name}}</p>
				</div>
				<div class="billing_address_edit" @click="pageAction('/invoice/info/edit?id='+item.id+'&from=billing&type='+item.type)">
					<svg aria-hidden="true" class="ico icon-bianji">
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-bianji">
						</use>
					</svg>
				</div>
			</div>
			<div class="select_address_add" @click="pageAction('/invoice/info/add?from=billing')">
				<svg aria-hidden="true" class="ico icon-jia">
					<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-jia"></use>
				</svg>
				<span>新建开票地址</span>
			</div>
		</div>
		<div class="ui-submit-button white-view" @click="submitInvoice">
			<span class="submit_button">确认</span>
		</div>
	</div>
</template>

<style lang="scss">
	
	@import '../address.scss';

</style>

<script>

	import AppHeader from '@/components/common/header'

	import { mapActions, mapGetters } from 'vuex'
	
	import store from '@/widget/store'

	import * as API from '@/api/invoice'

	export default {

		components: {
			AppHeader

		},

		data () {

			return {
				list: [],
				title: '开票资料',
				invoiceType: {
					"1": "个人",
					"2": "企业普票",
					"3": "企业增票"
				},
				billingAddress:{}
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

			checkedAddress () {

				this.$router.back()

			},
			pageAction(url) {

				this.$router.push(url)

			},

			/**
			 *
			 * 获取发票填写地址信息
			 */

			getInvoiceAddressList () {

				API.getInvoiceAddressList({
					type: "GET"
				}).then((res) => {

					this.updatePageView(true)

					this.$hideLoading()

					const data = res.data

					if (data && res.status >= 1) {

						this.list = data

						let billingAddress = {}

						data.forEach((item) => {

							billingAddress[item.id] = false

						})

						this.billingAddress = billingAddress

					} else {

						this.$toast(res.msg)

					}
				})
			},

			selectItem (id) {
				
				const { list, billingAddress } = this
				
				list.forEach((item) => {

					this.billingAddress[item.id] = false
					
				})

				this.billingAddress[id] = !this.billingAddress[id]
				
			},
			submitInvoice () {
				
				const { list, billingAddress } = this
				
				const isAddress = list.some((item) => {
					
					return billingAddress[item.id]
					
				})
				
				let invoice_id = ''
				
				let type = ''
				
				list.forEach((item) => {

					 if (billingAddress[item.id]) {

						 invoice_id = item.id
						 type = item.type
					 }
					
				})
				
				if (!isAddress) {
					
					this.$toast('请选择开票资料类型')
					return
				}
				
				let invoice_submit = store.get('INVOICE_SUBMIT')

				invoice_submit.invoice_id = invoice_id

				invoice_submit.type = type

				store.set('INVOICE_SUBMIT',invoice_submit)

				this.pageAction('/user/address?from=invoice')
				
			}
		},
		created (){

			this.updatePageView(false)

			this.$showLoading()

			this.getInvoiceAddressList()

		}

	}

</script>