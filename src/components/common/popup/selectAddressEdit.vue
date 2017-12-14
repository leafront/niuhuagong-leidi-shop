<template>
	<div class="select_popup" :class="{'active':isOverlayVisible == 5}">
		<div class="select_popup_tit" @click="updateIsOverlayVisible(3)">
			<span>修改地址</span>
			<svg aria-hidden="true" class="ico order_arrow_bot">
				<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-jiantou-top">
				</use>
			</svg>
		</div>
		<div class="form_address">
			<div class="ui-form-item">
				<input type="text" placeholder="收货人姓名" class="ui-form-input"/>
			</div>
			<div class="ui-form-item">
				<input type="text" placeholder="手机号码" class="ui-form-input"/>
			</div>
			<div class="ui-form-item" @click="selectArea">
				<input type="text" placeholder="所在地区" class="ui-form-input"/>
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
			<div class="address_new_submit">
				<span class="submit_button">确定</span>
			</div>
		</div>
	</div>
</template>

<script>

	import { mapGetters, mapActions } from 'vuex'

	export default {

		data () {

			return {

			}

		},

		methods: {

			...mapActions([
				'updateIsOverlayVisible',
				'updateIsCityPicker'
			]),
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
	
	.address_new_submit{
		
		padding-bottom: .3rem;
		
		span{
			
			background: #1ba0e5;
			
		}
		
	}
	
	.form_address_default{
		
		height: .8rem;
		
		display: flex;
		
		align-items: center;
		
		span{
			
			padding-left: .2rem;
			
		}
		
	}
	
	.form_address_checked{
		
		width: .4rem;
		
		height: .4rem;
		
		border-radius: 50%;
		
		border: .02rem solid #252525;
		
		background:#fff;
		
		display: flex;
		
		align-items: center;
		
		&.active{
			
			background: #252525;
			
		}
		
		.ico-gou{
			width: .26rem;
			height: .2rem;
			color: #fff;
			
		}
	}
	
	.form_address{
		
		padding: 0 .2rem;
		
	}

</style>