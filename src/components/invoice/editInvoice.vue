<template>
	<div>
		<div class="overlay_mask" @click="updateIsOverlayVisible(0)" :class="{'active':isOverlayVisible == 3}"></div>
		<div class="select_popup" :class="{'active':isOverlayVisible == 3}">
			<div class="select_popup_tit">
				<span>修改开票</span>
				<svg aria-hidden="true" class="ico order_arrow_bot">
					<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-jiantou-top">
					</use>
				</svg>
			
			</div>
			<div class="form_address">
				<div class="ui-form-item">
					<input type="text" placeholder="公司名称" v-model.trim="invoiceInfo.company_name" class="ui-form-input"/>
				</div>
				<div class="ui-form-item">
					<input type="text" placeholder="纳税人识别号" v-model.trim="invoiceInfo.taxpayer_number" class="ui-form-input"/>
				</div>
				<div class="ui-submit-button" @click="invoiceAptitudeEditInvoice">
					<span class="submit_button">确定</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

	import { mapGetters, mapActions } from 'vuex'

	import * as API from '@/api/invoice'

	import validate from '@/widget/validate'

	export default {

		data () {

			return {
				invoiceInfo: {
					company_name: '',
					taxpayer_number:''
				}
			}

		},

		methods: {

			...mapActions([
				'updateIsOverlayVisible',
				'updateIsCityPicker'
			]),

			/**
			 *
			 * 修改弹层发票信息
			 */
			invoiceAptitudeEditInvoice() {

				const results = this.invoiceInfo
				const {
					company_name,
					taxpayer_number

				} = results

				if (!company_name) {

					this.$toast('请输入公司名称')

					return

				}
				
				if (!taxpayer_number) {

					this.$toast('纳税人识别号')

					return
					
				}
				
				this.$showLoading()
				
				API.invoiceAptitudeEditInvoice({
					type: 'POST',
					data:results
				}).then((res) => {

					const data = res.data

					if (data && res.status >= 1) {
						
						this.$hideLoading()

						this.$toast(res.msg)
						
						this.updateIsOverlayVisible(0)
						
						this.$emit('invoiceAptitudeInfo')

					} else {

						this.$toast(res.msg)

					}

				})
			},
			selectArea () {

				this.updateIsCityPicker(true)

				this.updateIsOverlayVisible(0)

			}

		},

		computed: {
			...mapGetters({
				'isOverlayVisible': 'getIsOverlayVisible'
			})
		},

		created () {



		}

	}

</script>

<style lang="scss">
	
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