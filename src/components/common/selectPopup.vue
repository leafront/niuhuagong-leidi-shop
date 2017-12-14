<template>
	<div>
		<div class="overlay_mask" @click="closePopup" :class="{'active':isOverlayVisible}"></div>
		<ShopFoot/>
		<SubmitOrder/>
		<SelectAddress/>
		<SelectAddressNew/>
		<SelectAddressEdit/>
		<CityPicker @hideCityPicker="hideCityPicker" @showCityPicker="showCityPicker"/>
	</div>

</template>

<script>

	import ShopFoot from './popup/shopFoot'

	import SubmitOrder from './popup/submitOrder'

	import SelectAddress from './popup/selectAddress'

	import SelectAddressNew from './popup/selectAddressNew'

	import SelectAddressEdit from './popup/SelectAddressEdit'

	import CityPicker from '@/components/widget/CityPicker'

	import { mapGetters, mapActions } from 'vuex'

	export default {
		
		data () {
			
			return {

				isCityPopup: false
				
			}
			
		},

		components: {

			ShopFoot,
			SubmitOrder,
			SelectAddress,
			SelectAddressNew,
			SelectAddressEdit,
			CityPicker

		},

		computed: {
			...mapGetters({
				'isOverlayVisible': 'getIsOverlayVisible'
			})
		},

		methods: {

			hideCityPicker () {
				
				this.updateIsOverlayVisible(4)

				this.updateIsCityPicker(false)

				this.updateSelectCity('');
				
			},
			
			showCityPicker (val) {

				this.updateSelectCity(val);

				this.updateIsCityPicker(false)

				this.updateIsOverlayVisible(4)
				
			},
			
			...mapActions([
				'updateFootMenu',
				'updateIsOverlayVisible',
				'updateIsCityPicker',
				'updateSelectCity'
			]),

			closePopup() {

				if (this.isOverlayVisible == 1) {

					this.updateFootMenu(false)

				}

				this.updateIsOverlayVisible(0)

			}

		}

	}

</script>

<style lang="scss">
	
	
	.select_popup{
		width:100%;
		
		position: fixed;
		
		left:0;
		
		bottom:0;
		
		z-index:400;
		
		background: #fff;
		
		transform: translateY(100%) translate3d(0,0,0);
		
		transition: transform 0.5s cubic-bezier(0.4, 0.01, 0.165, 0.99);
		
		&.active{
			
			transform: translateY(0)
			
		}
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