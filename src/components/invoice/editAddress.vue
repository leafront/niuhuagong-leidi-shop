<template>
	<div>
		<div class="overlay_mask" @click="updateIsOverlayVisible(0)" :class="{'active':isOverlayVisible==2}"></div>
		<div class="select_popup" :class="{'active':isOverlayVisible == 2}">
			<div class="select_popup_tit" @click="updateIsOverlayVisible(0)">
				<span>修改地址</span>
				<svg aria-hidden="true" class="ico order_arrow_bot">
					<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-jiantou-top">
					</use>
				</svg>
			</div>
			<div class="form_address">
				<div class="ui-form-item">
					<input type="text" placeholder="收货人姓名" v-model.trim="addressInfo.receiver" class="ui-form-input"/>
				</div>
				<div class="ui-form-item">
					<input type="text" placeholder="手机号码" v-model.trim="addressInfo.mobile" class="ui-form-input"/>
				</div>
				<div class="ui-form-item" @click="selectArea">
					<input type="text" readonly="readonly" placeholder="所在地区" v-model="selectCityValue.name" class="ui-form-input"/>
				</div>
				<div class="ui-form-item">
					<input type="text" v-model.trim="addressInfo.address" placeholder="街道小区等详细地址" class="ui-form-input"/>
				</div>
				<div class="edit_address_new_submit" @click="invoiceAptitudeEditAddress">
					<span class="submit_button">确定</span>
				</div>
			</div>
		</div>
		<CityPicker @hideCityPicker="hideCityPicker" @showCityPicker="showCityPicker"/>
	</div>
</template>

<script>

	import { mapGetters, mapActions } from 'vuex'

	import CityPicker from '@/components/widget/CityPicker'

	import * as API from '@/api/invoice'

	import validate from '@/widget/validate'

	export default {
		
		props: ['addressInfo'],
		
		components:{

			CityPicker
		},

		computed: {
			...mapGetters({
				'isOverlayVisible': 'getIsOverlayVisible',
				'selectCityValue': 'getSelectCity'
			})
		},
		
		watch: {

			addressInfo () {
				
				const { province_name, city_name, area_name } = this.addressInfo

				const areaAddress = province_name + ' ' + city_name + ' ' + area_name

				this.updateSelectCity({name:areaAddress,address: {}})
				
			}
			
		},

		methods: {

			...mapActions([
				'updateIsOverlayVisible',
				'updateIsCityPicker',
				'updateSelectCity'
			]),
			selectArea () {

				this.updateIsCityPicker(true)

				this.updateIsOverlayVisible(0)

			},
			/**
			 * 隐藏城市ui控件
			 */
			hideCityPicker () {

				this.updateIsCityPicker(false)

				this.updateIsOverlayVisible(2)

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

				this.updateIsOverlayVisible(2)

			},

			/**
			 * 修改发票地址信息
			 */
			invoiceAptitudeEditAddress() {

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

				this.updateIsOverlayVisible(0)
			}

		}

	}

</script>

<style lang="scss">
	
	.edit_address_new_submit{
		
		padding:.3rem 0;
		
		span{
			
			background: #1ba0e5;
			
		}
		
	}
	.form_address{
		
		padding: 0 .2rem;
		
	}
	.select_popup_tit{
		
		height: 1.04rem;
		
		padding:0 .23rem;
		
		display: flex;
		
		justify-content: space-between;
		
		align-items: center;
		
		border-bottom: .01rem solid #f1f1f1;
		
		span{
			
			font-size: .28rem;
			
		}
		
		.order_arrow_bot{
			padding-left: .2rem;
			width: .25rem;
			height: .5rem;
			color: #9d9d9d;
			
		}
		
	}

</style>