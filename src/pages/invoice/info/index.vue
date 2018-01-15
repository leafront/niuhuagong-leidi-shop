<template>
	<div class="pageView">
		<AppHeader :title="title"></AppHeader>
		<div class="scroll-view-wrapper" :class="{'visibility':!pageView}">
			<div class="address_title_wrapper">
				<div class="address_title">
					<h5>开票资料</h5>
					<span @click="invoiceInfoDelete" v-show="isDelete && !frommPage">删除</span>
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
				<div class="billing_address_edit" @click="pageAction('/invoice/info/edit?id='+item.id+'&type='+item.type)">
					<svg aria-hidden="true" class="ico icon-bianji">
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-bianji">
						</use>
					</svg>
				</div>
			</div>
			<div class="select_address_add" @click="pageAction('/invoice/info/add')">
				<svg aria-hidden="true" class="ico icon-jia">
					<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-jia"></use>
				</svg>
				<span>新建开票资料</span>
			</div>
		</div>
		<div class="ui-submit-button white-view" @click="submitInvoice" v-if="frommPage">
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

	import common from '@/widget/common'

	export default {

		components: {
			AppHeader
		},

		data () {
			
			const frommPage = this.$route.query.from

			return {
				frommPage,
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
			}),
			isDelete () {

				const list = this.list
				const billingAddress = this.billingAddress

				const isDelete = list.some((item) => {

					return  billingAddress[item.id]

				})

				return isDelete

			}
		},

		methods: {

			...mapActions([
				'updatePageView',
			]),

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

				this.pageAction(this.frommPage+'?from=/invoice/order')

			},

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
					const data = res.data

					if (data && res.status >= 1) {
						this.updatePageView(true)
						this.$hideLoading()

						this.list = data

						let billingAddress = {}

						data.forEach((item) => {

							billingAddress[item.id] = false

						})

						this.billingAddress = billingAddress

					} else {

						this.$hideLoading()
						this.$toast(res.msg)

					}
				})
			},

			selectItem (id) {
				
				const { list, billingAddress, frommPage } = this

				if (frommPage) {
					list.forEach((item) => {
						this.billingAddress[item.id] = false
					})

				}

				this.billingAddress[id] = !this.billingAddress[id]

			},

			/**
			 *
			 * 删除发票填写地址信息
			 */

			invoiceInfoDelete () {

				const billingAddress = this.billingAddress
				const list = this.list
				
				let results = []
				
				list.forEach((item) => {
					
					if (billingAddress[item.id]) {
						results.push(item.id)
					}
					
				})

				API.invoiceInfoDelete({
					type: "POST",
					data: {
						invoice_id: JSON.stringify(results)
					}
				}).then((res) => {

					const data = res.data

					if (data && res.status >= 1) {

						this.$toast(res.msg)

						for (let len = list.length, i = len - 1; i >=0; i--) {

							if (billingAddress[list[i].id]) {

								this.list.splice(i,1)

							}
						}
						
					} else {

						this.$toast(res.msg)

					}
				})
			}
		},
		
		beforeCreate () {
			
			document.title = '开票资料'
			
		},

		created (){

			this.updatePageView(false)
			
			this.getInvoiceAddressList()

			common.showLoading.call(this)

		}

	}

</script>