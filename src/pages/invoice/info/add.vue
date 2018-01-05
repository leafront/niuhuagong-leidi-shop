<template>
	<div class="pageView">
		<AppHeader :title="title"></AppHeader>
		<div class="scroll-view-wrapper white-view">
			<div class="billing_type">
				<div class="billing_type_item" @click="showTab(item.id)" v-for="(item,index) in typeList">
					<div class="billing_address_checked" :class="{'active': params.invoice_type==item.id}">
						<svg aria-hidden="true" class="ico ico-gou">
							<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-gou">
							</use>
						</svg>
					</div>
					<span>{{item.name}}</span>
				</div>
			</div>
			<div class="billing_form" v-show="params.invoice_type==1">
				<div class="ui-form-item">
					<input type="text" placeholder="发票姓名" v-model.trim="params.name" class="ui-form-input"/>
				</div>
			</div>
			<div class="billing_form" v-show="params.invoice_type==2">
				<div class="ui-form-item">
					<input type="text" placeholder="公司名称" v-model.trim="params.company_name" class="ui-form-input"/>
				</div>
				<div class="ui-form-item">
					<input type="text" placeholder="纳税人识别号" v-model.trim="params.taxpayer_number" class="ui-form-input"/>
				</div>
			</div>
			<div class="billing_form" v-show="params.invoice_type==3">
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
							<input type="file" @change="uploadInvoice($event,'img1')" class="billing_upload_file" accept="image/png,image/jpeg,image/jpg"/>
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
							<input type="file" @change="uploadInvoice($event,'img2')" class="billing_upload_file"  accept="image/png,image/jpeg,image/jpg"/>
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
	
	@import './index.scss';

</style>

<script>
	
	import ImageUpload from '@/components/widget/imageUpload'

	import AppHeader from '@/components/common/header'
	
	import * as API from '@/api/invoice'
	
	import validate from '@/widget/validate'
	
	export default {

		components: {
			AppHeader

		},

		data () {

			return {
				title: '新建开票信息',
				typeList:[{id:1,name:'个人'},{id:2,name:'企业普票'},{id:3,name:'企业增票'}],
				params: {
					"invoice_type": 1,
					"name": "",
					"taxpayer_number": "",
					"company_address": "",
					"company_mobile": "",
					"company_name": "",
					"bank": "",
					"img1":"",
					"img2": ""
				}
			}

		},

		beforeCreate () {

			document.title = '新建开票信息'

		},

		methods: {

			/**
			 * 增加新建开票信息
			 *
			 */

			invoiceInfoAdd () {
				
				const {
					name,
					taxpayer_number,
					company_address,
					company_mobile,
					company_name,
					bank,
					img1,
					img2,
					invoice_type
					
				} = this.params
				
				let results = {
					invoice_type
				}
				
				if (invoice_type == 1) {
				
					if (!name) {
						
						this.$toast('请输入发票姓名')
						return
						
					}
					results.name = name
				} else if (invoice_type == 2) {
					
					console.log(company_name)
					if (!company_name) {

						this.$toast('请输入公司名称')
						return

					}
					if (!taxpayer_number) {

						this.$toast('请输入纳税人识别号')
						return
					}

					results.company_name  =  company_name
					results.taxpayer_number = taxpayer_number
					
				} else if (invoice_type == 3) {

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

					results = Object.assign(results,{
						company_name,
						taxpayer_number,
						company_address,
						company_mobile,
						bank,
						img1,
						img2
					})
				}

				this.$showLoading()
				
				API.invoiceInfoAdd({
					type: 'POST',
					data: results
				}).then((res) => {
					
					const data = res.data
					
					if (data && res.status >=1) {

						this.$hideLoading()
						
						this.$toast(res.msg)
						
						setTimeout(() => {

							this.$router.back()
							
						},2000)
						
					} else {
						
						this.$hideLoading()
						
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