<template>
	<div class="pageView">
		<AppHeader :title="title"></AppHeader>
		<div class="scroll-view-wrapper white-view" id="appView">
			<div class="form_address">
				<div class="ui-form-item">
					<input type="text" placeholder="收货人姓名" v-model.trim="addressInfo.receiver" class="ui-form-input"/>
				</div>
				<div class="ui-form-item">
					<input type="text" placeholder="手机号码" v-model="addressInfo.mobile" class="ui-form-input"/>
				</div>
				<div class="ui-form-item" @click="updateIsCityPicker(true)">
					<input type="text" readonly="readonly" placeholder="所在地区" v-model="selectCityValue.name" class="ui-form-input"/>
				</div>
				<div class="ui-form-item">
					<input type="text" placeholder="街道小区等详细地址" v-model="addressInfo.address" class="ui-form-input"/>
				</div>
				<div class="form_address_default" @click="setDefaultAddress">
					<div class="form_address_checked" :class="{'active': addressInfo.isDefault}">
						<svg aria-hidden="true" class="ico ico-gou">
							<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-gou">
							</use>
						</svg>
					</div>
					<span>设为默认地址</span>
				</div>
			</div>
		</div>
		<CityPicker @hideCityPicker="hideCityPicker" @showCityPicker="showCityPicker"/>
		<div class="address_new_submit" @click="editUserAddress">
			<span class="submit_button">确定</span>
		</div>
	</div>
</template>

<style lang="scss">
	@import '../address.scss';

</style>

<script>

	import AppHeader from '@/components/common/header'

	import CityPicker from '@/components/widget/CityPicker'

	import * as API from '@/api/address'

	import { mapActions, mapGetters } from 'vuex'

	export default {

		components: {
			AppHeader,
			CityPicker

		},


		computed: {
			...mapGetters({
				'selectCityValue': 'getSelectCity',
				'pageView':'getPageView'
			})
		},

		data () {

			return {

				title: '修改地址',
				addressInfo: {},
				areaAddress:''

			}


		},
		beforeCreate () {

			document.title = '修改地址'

		},
		methods: {

			...mapActions([
				'updateIsCityPicker',
				'updateSelectCity',
				'updatePageView'
			]),
			/**
			 * 编辑当前用户地址
			 */
			editUserAddress () {
				
				const results = this.addressInfo

				API.editUserAddress({
					type: 'POST',
					data:results
				}).then((res) => {

					const data = res.data

					if (data && res.status >= 1) {

						this.$toast('修改成功')
						
						setTimeout(() => {
							
							this.$router.push('/user/address')
							
						},2000)

					} else {

						this.$toast(res.msg)

					}

				})
				
				
			},

			setDefaultAddress () {
			
				this.addressInfo.isDefault = this.addressInfo.isDefault ? 0 : 1
			
			},

			/**
			 *
			 * 获取当前用户地址
			 */

			getUserAddress () {

				API.getUserAddress({
					type: 'POST',
					data: {
						id: this.$route.query.id
						
					}
				}).then((res) => {

					const data = res.data

					if (data && res.status >= 1) {

						this.updatePageView(true)

						this.$hideLoading()
						
						data.isDefault = parseInt(data.isDefault)

						this.addressInfo = data
						
						const { province_name, province_id, city_name, city_id, area_name, area_id } = data
						
						const areaAddress = province_name + ' ' + city_name + ' ' + area_name
						
						const areaIds = province_id + ' ' + city_id + ' ' + area_id
						
						this.updateSelectCity({name:areaAddress,id: areaIds})

					} else {

						this.$toast(res.msg)

					}

				})
				
			},
			hideCityPicker () {

				this.updateIsCityPicker(false)

				this.updateSelectCity('');

			},

			showCityPicker (val) {

				this.updateSelectCity(val);

				this.updateIsCityPicker(false)
				
				const { name,id } = val
				
				const province_id = id[0]

				const city_id = id[1]
				
				const  area_id = id[2]
				
				const resultName = name.split(' ')
				
				const province_name = resultName[0]
				
				const city_name = resultName[1]
				
				const area_name = resultName[2]
				
				this.addressInfo.province_id = province_id
				this.addressInfo.city_id = city_id
				this.addressInfo.area_id = area_id
				
				this.addressInfo.province_name = province_name
				this.addressInfo.city_name = city_name
				this.addressInfo.area_name = area_name

			}

		},

		created (){

			this.updatePageView(false)

			this.$showLoading()

			this.getUserAddress()
		
		}

	}

</script>