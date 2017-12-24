<template>
	<div class="pageView">
		<AppHeader :title="title"></AppHeader>
		<div class="scroll-view-wrapper white-view" id="appView">
			<div class="form_address">
				<div class="ui-form-item">
					<input type="text" placeholder="收货人姓名" v-model="addressInfo.receiver" class="ui-form-input"/>
				</div>
				<div class="ui-form-item">
					<input type="tel" placeholder="手机号码" v-model="addressInfo.mobile" class="ui-form-input"/>
				</div>
				<div class="ui-form-item" @click="updateIsCityPicker(true)">
					<input type="text" readonly="readonly" placeholder="所在地区" v-model="selectCityValue.name" class="ui-form-input"/>
				</div>
				<div class="ui-form-item">
					<input type="text" placeholder="街道小区等详细地址" v-model="addressInfo.address" class="ui-form-input"/>
				</div>
			</div>
		</div>
		<CityPicker @hideCityPicker="hideCityPicker" @showCityPicker="showCityPicker"/>
		<div class="ui-submit-button" @click="invoiceAptitudeAdd">
			<span class="submit_button">确定</span>
		</div>
	</div>
</template>

<style lang="scss">
	
	
	.form_address{
		
		padding: 0 .2rem;
		
	}

</style>

<script>

	import AppHeader from '@/components/common/header'

	import CityPicker from '@/components/widget/CityPicker'
	
	import * as API from '@/api/invoice'
	
	import validate from '@/widget/validate'

	import { mapActions, mapGetters } from 'vuex'

	export default {

		components: {
			AppHeader,
			CityPicker
		},

		computed: {
			...mapGetters({
				'selectCityValue': 'getSelectCity',
			})
		},

		data () {

			return {

				title: '添加地址',
				addressInfo: {
					city_id: '',
					province_name:'',
					province_id: '',
					city_name: '',
					area_name: '',
					area_id: '',
					receiver: '',
					mobile: '',
					address: ''
				}
			}
			
		},

		methods: {

			...mapActions([
				'updateIsCityPicker',
				'updateSelectCity'
			]),

			invoiceAptitudeAdd() {

				const results = this.addressInfo
				const {
					province_name,
					area_id,
					receiver,
					mobile,
					address,

				} = results

				if (!receiver) {

					this.$toast('请输入收货人姓名')

					return

				}

				if (!validate.isName(receiver)) {
					this.$toast('请输入正确的收货人姓名')
					return
				}

				if (!mobile) {

					this.$toast('请输入手机号码')

					return

				}

				if (!validate.isMobile(mobile)) {
					this.$toast('请输入正确的手机号码')
					return
				}

				if (!this.selectCityValue.name) {

					this.$toast('请输入所选地区')

					return

				}

				if (!address) {

					this.$toast('街道小区等详细地址')

					return

				}

				API.invoiceAptitudeAdd({
					type: 'POST',
					data:results
				}).then((res) => {

					const data = res.data

					if (data && res.status >= 1) {

						this.$toast(res.msg)

						setTimeout(() => {

							this.$router.push('/invoice/address')

						},2000)

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

				let addressInfo = Object.assign({},this.addressInfo)

				addressInfo = Object.assign(addressInfo,addressInfoVal.address)

				this.addressInfo = addressInfo

			}

		},
		
		beforeCreate () {
			
			document.title = '添加地址'
			
		},

		created (){


		}

	}

</script>