<template>
	<div class="search_wrapper">
		<div class="header_nav" @click="showSliderMenu">
			<svg class="ico icon_dang" aria-hidden="true">
				<use xlink:href="#icon-daohanganniu"></use>
			</svg>
		</div>
		<div class="home_search" @click="pageAction('/search')">
			<svg class="ico home_search_ico" aria-hidden="true">
				<use xlink:href="#icon-sousuo2"></use>
			</svg>
			<input type="text" placeholder="环氧填缝剂" class="home_search_input"/>
		</div>
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
			]),

			showSliderMenu () {
				
				let sliderMenu = !this.sliderMenu
				
				this.updateSliderMenu(sliderMenu)
				
			},
			pageAction(url) {
				
				this.$router.push(url)
				
			}
			
		}
		
	}
	
</script>

<style lang="scss">
	
	
	.header_nav{
		
		width: .62rem;
		
		height: .62rem;
		
		background: #fff;
		
		display: flex;
		
		align-items: center;
		
		justify-content: center;
		
		border-radius: 50%;
		
		margin-right: .22rem;
		
		.icon_dang{
			
			width: .35rem;
			
			height: .4rem;
			
			color: #9d9d9d;
			
		}
		
	}
	
	.search_wrapper{
		
		display: flex;
		
		position:absolute;
		
		left:50%;
		
		width:100%;
		
		padding: 0 .2rem;
		
		transform: translateX(-50%);
		top: .2rem;
		z-index:300;
		
	}
	
	.home_search{
		
		height: .64rem;
		
		background: #f6f6f6;
		
		border-radius: .3rem;
		
		padding-left: .4rem;
		
		display: flex;
		
		flex:1;
		
		align-items: center;
		
		.home_search_ico{
			
			width: .35rem;
			
			height: .35rem;
			
			color: #008aec;
			
		}
		
		.home_search_input{
			
			width:100%;
			
			padding-left: .14rem;
			
		}
	}
</style>