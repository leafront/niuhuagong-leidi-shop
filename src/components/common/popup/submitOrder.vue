<template>
	<div class="select_popup" :class="{'active':isOverlayVisible == 2}">
		<div class="submit_order_back" @click="updateIsOverlayVisible(1)">
			<svg aria-hidden="true" class="ico order_arrow_left">
				<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-jiantou-left">
				</use>
			</svg>
		</div>
		<div class="submit_order_item" @click="updateIsOverlayVisible(3)">
			<span>收货地址</span>
			<div class="submit_order_menu">
				<strong>请添加收货地址</strong>
				<svg aria-hidden="true" class="ico order_arrow_bot">
					<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-jiantou-bottom">
					</use>
				</svg>
			</div>
		</div>
		<div class="submit_order_item">
			<span>运费</span>
			<div class="submit_order_menu">
				<strong>不支持发票</strong>
			</div>
		</div>
		<div class="submit_order_item">
			<span>应付总额</span>
			<div class="submit_order_menu">
				<strong>￥185.2</strong>
			</div>
		</div>
		<div class="submit_order_btn">
			<span class="submit_button">提交订单</span>
		</div>
	</div>
	
</template>


<script>


	import { mapGetters, mapActions } from 'vuex'
	
	export default  {
		
		data () {
		
			return {
			
			}
			
		},
		
		methods: {
			
			...mapActions([
				'updateIsOverlayVisible'
				
			])
			
		},

		computed: {
			...mapGetters({
				'isOverlayVisible': 'getIsOverlayVisible'
			})

		},
		
	}
	
</script>

<style lang="scss">
	
	.submit_order_btn{
		
		padding: 0 .2rem;
		
		height: 1.44rem;
		
		display: flex;
		
		align-items: center;
		
		span{
			
			background: #f65253;
			
		}
	}
	
	.submit_order_item{
		
		height: 1rem;
		
		display: flex;
		
		align-items: center;
		
		justify-content: space-between;
		
		padding:0 .25rem;
		
		font-size: .28rem;
		
		border-bottom: .01rem solid #f1f1f1;
		
	}
	
	.submit_order_menu{
		
		display: flex;
		
		align-items: center;
		
		height: 1rem;
		
	}

	.order_arrow_left{
		
		width: .42rem;
		height: .35rem;
		color: #9d9d9d;
	}
	
	.order_arrow_bot{
		padding-left: .2rem;
		width: .25rem;
		height: .5rem;
		color: #9d9d9d;
		
	}
	
	.submit_order{
		
		width:100%;
		
		position:absolute;
		
		left:0;
		
		bottom:0;
		
		z-index:400;
		
		background: #fff;
		
	}
	.submit_order_back{
		
		height: 1rem;
		
		display: flex;
		
		align-items: center;
		
		padding: 0 .25rem;
		
		border-bottom: .01rem solid #f1f1f1;
		
		
	}
</style>