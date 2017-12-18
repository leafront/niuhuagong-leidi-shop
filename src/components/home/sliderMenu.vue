<template>
	<div class="slider_menu" :class="{'active':sliderMenu}">
		<ul class="slider_menu_list">
			<li>
				<svg class="ico menu_icon" aria-hidden="true">
					<use xlink:href="#icon-bid-online"></use>
				</svg>
				<span>瓷砖胶</span>
			</li>
			<li>
				<svg class="ico menu_icon" aria-hidden="true">
					<use xlink:href="#icon-shigongdanwei"></use>
				</svg>
				<span>填缝剂</span>
			</li>
			<li>
				<svg class="ico menu_icon" aria-hidden="true">
					<use xlink:href="#icon-shigongzhong1"></use>
				</svg>
				<span>防水材料</span>
			</li>
			<li>
				<svg class="ico menu_icon" aria-hidden="true">
					<use xlink:href="#icon-shezhi"></use>
				</svg>
				<span>其他</span>
			</li>
		</ul>
	</div>
</template>


<script>

	import { mapGetters, mapActions } from 'vuex'

	export default {
		
		computed: {
			...mapGetters({
				'sliderMenu': 'getSliderMenu'
			})
			
		},
		methods: {

			...mapActions([
				'updateSliderMenu'
			])
		}
		
	}
	
</script>

<style lang="scss">
	.slider_menu{
		
		position: absolute;
		
		width: 2.5rem;
		
		background: #fff;
		
		left:0;
		
		top:1.04rem;
		
		z-index: 300;
		
		max-height: 0;
		
		overflow:hidden;
		
		transition: all 700ms linear;
		
		&.active{
			
			max-height: 2000px;
			
		}
	}
	
	.slider_menu_list{
		
		li{
			height: .85rem;
			
			display: flex;
			
			align-items: center;
			
			justify-content: center;
			
			border-bottom: .01rem solid #e6e6e6;
			
			.menu_icon{
				
				width: .4rem;
				height: .4rem;
				color: #a2a2a2;
				
			}
			
			span{
				
				margin-left: .25rem;
				
			}
		}
		
	}

</style>