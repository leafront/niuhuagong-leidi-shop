<template>
	<div class="pageView">
		<AppHeader :title="title"></AppHeader>
		<div class="scroll-view-wrapper white-view">
			<div class="billing_form">
				<div class="ui-form-item">
					<input type="text" placeholder="公司名称" v-model.trim="params.company_name" class="ui-form-input"/>
				</div>
				<div class="ui-form-item">
					<input type="text" placeholder="纳税人识别号" v-model.trim="params.taxpayer_number" class="ui-form-input"/>
				</div>
				<div class="ui-form-item">
					<input type="text" placeholder="公司地址" v-model.trim="params.company_address" class="ui-form-input"/>
				</div>
				<div class="ui-form-item">
					<input type="text" placeholder="公司电话" v-model.trim="params.company_mobile" class="ui-form-input"/>
				</div>
				<div class="ui-form-item">
					<input type="text" placeholder="开户银行" v-model.trim="params.bank" class="ui-form-input"/>
				</div>
				<div class="billing_upload">
					<div class="billing_upload_wrapper">
						<div class="billing_upload_item">
							<svg aria-hidden="true" class="ico ico-xiangji">
								<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-xiangji">
								</use>
							</svg>
							<input type="file" @change="uploadInvoice($event,'img1')" class="billing_upload_file"/>
							<img class="billing_upload_img" v-show="params.img1" :src="params.img1"/>
						</div>
						<p>营业执照(三证合一)</p>
					</div>
					<div class="billing_upload_wrapper">
						<div class="billing_upload_item">
							<svg aria-hidden="true" class="ico ico-xiangji">
								<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-xiangji">
								</use>
							</svg>
							<input type="file" @change="uploadInvoice($event,'img2')" class="billing_upload_file"/>
							<img class="billing_upload_img" v-show="params.img2" :src="params.img2"/>
						</div>
						<p>一般纳税人资质证明</p>
					</div>
				</div>
			</div>
		</div>
		<div class="ui-submit-button white-view" @click="invoiceInfoAdd">
			<span class="submit_button">确认</span>
		</div>
	</div>
</template>

<style lang="scss">
	
	@import './info/index.scss';

</style>

<script>

	import ImageUpload from '@/components/widget/imageUpload'

	import AppHeader from '@/components/common/header'

	import * as Model from '@/model/invoice'

	import validate from '@/widget/validate'

	import { mapActions, mapGetters } from 'vuex'

	export default {

		components: {
			AppHeader
		},
		data () {

			return {
				title: '申请增票资质',
				params: {
					taxpayer_number: "",
					company_address: "",
					company_mobile: "",
					company_name: "",
					bank: "",
					img1:"",
					img2:""
				}
			}
		},

		computed: {
			...mapGetters({
				'pageView':'getPageView'
			})
		},
		created () {

		
		

		},
		beforeCreate () {

			document.title = '申请增票资质'

		},

		methods: {
			...mapActions([
				'updatePageView'
			]),

			/**
			 * 增加新建开票信息
			 *
			 */

			invoiceInfoAdd () {
				
				const results = this.params

				const {
					taxpayer_number,
					company_address,
					company_mobile,
					company_name,
					bank,
					img1,
					img2

				} = results
				
				if (!company_name) {
					this.$toast('请输入公司名称')
					return

				}
				if (!taxpayer_number) {
					this.$toast('请输入纳税人识别号')
					return
				}

				if (!company_address) {
					this.$toast('请输入公司地址')
					return
				}

				if (!company_mobile) {
					this.$toast('请输入公司电话')
					return
				}

				if (!validate.isTelephone(company_mobile)) {
					this.$toast('请输入正确的公司电话')
					return
				}

				if (!bank) {
					this.$toast('请输入开户银行')
					return
				}

				if (!img1) {
					this.$toast('请上传营业执照图片')
					return
				}
				if (!img2) {
					this.$toast('请上传一般纳税人资质证明图片')
					return
				}
				
				Model.invoiceBillingSubmit({
					type: 'POST',
					data: results
				}).then((res) => {

					const data = res.data

					if (res.status >= 1) {
						
						this.$toast(res.msg)
						
						setTimeout(() => {
							
							this.pageAction('/invoice')
							
						},2000)
						
					} else {

						this.$toast(res.msg)

					}
				})
			},

			uploadInvoice (e,img) {

				var file = e.currentTarget.files[0];

				var imageUpload = new ImageUpload(file, {

					url: '/api/shop/invoice/upload_img',
					fileKey: 'files',
					onUpload:(result) =>{

						if (result.status >= 1) {

							this.params[img]= result.data.img_dir
							e.target.value = ''
							this.$toast(result.msg)

						} else {
							
							e.target.value = ''

							this.$toast(result.msg)
						}
					},
					onError: () =>{
						this.$toast('网络服务器错误')
					}
				})
				imageUpload.start();

			},

			pageAction (url) {

				this.$router.push(url)

			},
			showTab (type) {

				this.params.invoice_type = type

			}

		}
	}

</script>