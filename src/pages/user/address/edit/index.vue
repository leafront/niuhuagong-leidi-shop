<template>
	<div class="pageView">
		<AppHeader :title="title"></AppHeader>
		<div class="scroll-view-wrapper addressAdd-view" id="appView">
			<div class="form_address">
				<div class="ui-form-item">
					<input type="text" placeholder="收货人姓名" class="ui-form-input"/>
				</div>
				<div class="ui-form-item">
					<input type="text" placeholder="手机号码" class="ui-form-input"/>
				</div>
				<div class="ui-form-item" @click="updateIsCityPicker(true)">
					<input type="text" readonly="readonly" placeholder="所在地区" v-model="selectCityValue" class="ui-form-input"/>
				</div>
				<div class="ui-form-item">
					<input type="text" placeholder="街道小区等详细地址" class="ui-form-input"/>
				</div>
				<div class="form_address_default">
					<div class="form_address_checked active">
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
		<div class="address_new_submit">
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

				title: '修改地址'

			}


		},
		methods: {

			...mapActions([
				'updateIsCityPicker',
				'updateSelectCity'
			]),
			hideCityPicker () {

				this.updateIsCityPicker(false)

				this.updateSelectCity('');

			},

			showCityPicker (val) {

				this.updateSelectCity(val);

				this.updateIsCityPicker(false)

			}

		},

		created (){


		}

	}

</script>