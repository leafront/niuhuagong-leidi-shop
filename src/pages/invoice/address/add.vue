<template>
	<div class="pageView">
		<AppHeader :title="title"></AppHeader>
		<div class="scroll-view-wrapper white-view" id="appView">
			<div class="form_address">
				<div class="ui-form-item">
					<input type="text" placeholder="收货人姓名" class="ui-form-input"/>
				</div>
				<div class="ui-form-item">
					<input type="tel" placeholder="手机号码" class="ui-form-input"/>
				</div>
				<div class="ui-form-item" @click="updateIsCityPicker(true)">
					<input type="text" readonly="readonly" placeholder="所在地区" v-model="selectCityValue" class="ui-form-input"/>
				</div>
				<div class="ui-form-item">
					<input type="text" placeholder="街道小区等详细地址" class="ui-form-input"/>
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
	
	
	.address_new_submit{
		
		padding: 0 .2rem  .6rem;
		
		span{
			
			background: #1ba0e5;
			
		}
		
	}
	
	
	.form_address{
		
		padding: 0 .2rem;
		
	}

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

				title: '添加地址'

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
		
		beforeCreate () {
			
			document.title = '添加地址'
			
		},

		created (){


		}

	}

</script>