<template>
	<div class="pageView">
		<AppHeader :title="title"></AppHeader>
		<div class="scroll-view-wrapper white-view">
			<div class="auth_factory">
				<div class="auth_title">
					<span>个人信息</span>
				</div>
				<div class="ui-form-item">
					<input type="text" placeholder="真实姓名" v-model="params.name" class="ui-form-input"/>
				</div>
				<div class="ui-form-item">
					<input type="tel" placeholder="身份证号码" v-model.trim="params.idcard" class="ui-form-input"/>
				</div>
				<div class="ui-form-item">
					<input type="tel" placeholder="手机号码" v-model.trim="params.mobile" class="ui-form-input"/>
				</div>
				<div class="ui-form-item">
					<input type="tel" placeholder="短信验证码" v-model.trim="params.smscode" class="ui-form-input"/>
					<button class="auth_code" :disabled="clickCode" @click="userAuthSendMsg">{{codeTxt}}</button>
				</div>
				<div class="ui-form-item" @click="updateIsCityPicker(true)">
					<input type="text" placeholder="所在区域" v-model="selectCityValue.name" class="ui-form-input"/>
				</div>
				<div class="ui-form-item">
					<input type="text" placeholder="具体地址" v-model="params.guide_address" class="ui-form-input"/>
				</div>
				<div class="ui-form-item">
					<input type="text" placeholder="瓷砖品牌" v-model="params.store_brand" class="ui-form-input"/>
				</div>
				<div class="auth_title">
					<span>上传图片</span>
				</div>
				<div class="auth_upload">
					<div class="auth_upload_wrapper">
						<div class="auth_upload_item">
							<svg aria-hidden="true" class="ico ico-xiangji">
								<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-xiangji">
								</use>
							</svg>
							<input type="file" @change="uploadInvoice($event,{img:'img1',type:1})" class="auth_upload_file" accept="image/png,image/jpeg,image/jpg" />
							<img class="auth_upload_img" v-show="params.img1" :src="params.img1"/>
						</div>
						<p>手持身份证照片</p>
					</div>
					<div class="auth_upload_wrapper">
						<div class="auth_upload_item">
							<svg aria-hidden="true" class="ico ico-xiangji">
								<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-xiangji">
								</use>
							</svg>
							<input type="file" @change="uploadInvoice($event,{img:'img2',type:3})" class="auth_upload_file" accept="image/png,image/jpeg,image/jpg" />
							<img class="auth_upload_img" v-show="params.img2" :src="params.img2"/>
						</div>
						<p>本人大头照</p>
					</div>
				</div>
			</div>
		</div>
		<CityPicker @hideCityPicker="hideCityPicker" @showCityPicker="showCityPicker"/>
		<div class="ui-submit-button white-view" @click="userVerifyCode">
			<span class="submit_button">确认</span>
		</div>
	</div>
</template>

<script>

	import AppHeader from '@/components/common/header'

	import { mapActions, mapGetters } from 'vuex'

	import CityPicker from '@/components/widget/CityPicker'

	import * as API from '@/api/user'

	import model from './model'

	import validate from '@/widget/validate'

	import ImageUpload from '@/components/widget/imageUpload'

	export default {

		components: {
			AppHeader,
			CityPicker
		},

		data () {

			return {
				title: '达人导购认证',
				img1: '',
				img2: '',
				codeTxt:'获取验证码',
				clickCode: false,
				params:{
					store_brand:'',
					name:'',
					idcard:'',
					mobile:'',
					smscode:'',
					img1:'',
					img2:'',
					guide_address:''
				}
			}
		},

		computed: {
			...mapGetters({
				'selectCityValue': 'getSelectCity'
			})
		},

		beforeCreate () {

			document.title = '达人导购认证'

		},

		methods: {

			...mapActions([
				'updateIsCityPicker',
				'updateSelectCity',
			]),
			pageAction(url) {

				this.$router.push(url)

			},
			countTime: model.countTime,

			userAuthSendMsg: model.userAuthSendMsg,

			userVerifyCode: model.userVerifyCode,

			/**
			 * 提交门店认证
			 *
			 */

			submitStore () {

				const {
					name,
					idcard,
					mobile,
					smscode,
					guide_address,
					store_brand,
					img1,
					img2
				} = this.params
				
				if (!name) {

					this.$toast('请输入真实姓名')
					return

				}
				if (!validate.isName(name)) {

					this.$toast('请输入正确的真实姓名')
					return

				}
				if (!idcard) {

					this.$toast('请输入身份证号码')
					return
				}

				if (!validate.isIdCard(idcard)) {

					this.$toast('请输入正确的身份证号码')
					return

				}

				if (!smscode) {

					this.$toast('请输入正确的验证码')
					return
				}

				if (!validate.isMessageCode(smscode)) {

					this.$toast('请输入正确的验证码')
					return
				}

				if (!this.selectCityValue.name) {

					this.$toast('请输入所在地区')
					return

				}
				if (!guide_address) {

					this.$toast('请输入具体地址')
					return
				}
				
				if (!store_brand) {
					
					this.$toast('请输入瓷砖品牌')
					return
					
				}

				if (!img1) {

					this.$toast('请上传手持身份证照片图片')
					return
				}

				if (!img2) {

					this.$toast('请上传本人大头照图片')
					return
				}

				const result = this.params
				result.img1 = img1
				result.img2 = img2

				this.$showLoading()

				API.userAuthGuide({
					type: 'POST',
					data: result
				}).then((res) => {

					this.$hideLoading()

					const data = res

					if (data && res.status >= 1) {

						this.$toast(res.msg)

						setTimeout(() => {

							this.pageAction('/user/center')

						})

					} else {

						this.$toast(res.msg)

					}

				})

			},

			/**
			 * 隐藏城市ui控件
			 */
			hideCityPicker () {

				this.updateIsCityPicker(false)

			},

			/**
			 * 显示城市ui控件
			 *
			 * @param {Object} addressInfoVal
			 */

			showCityPicker (addressInfoVal) {

				this.updateSelectCity(addressInfoVal);

				this.updateIsCityPicker(false)

				let addressInfo = Object.assign({},this.params)

				addressInfo = Object.assign(addressInfo,addressInfoVal.address)

				this.params = addressInfo

			},
			uploadInvoice (e,opt) {

				var file = e.currentTarget.files[0];

				var imageUpload = new ImageUpload(file, {

					url: '/api/shop/approve/upload_img',

					data: {
						type: opt.type,
					},
					fileKey: 'files',
					onUpload:(result) =>{

						if (result.status >= 1) {

							this.params[opt.img] = result.data.img_dir
							e.target.value = ''
							this.$toast(res.msg)

						} else {

							this.$toast(res.msg)

						}

					},
					onError: () =>{
						this.$toast('网络服务器错误')
					}
				})
				imageUpload.start();
				
			}

		}

	}
</script>

<style lang="scss">
	
	@import './auth.scss';

</style>