<template>
	<div class="pageView">
		<div class="scroll-view-wrapper search-view">
			<SearchBar/>
			<HotSearch/>
		</div>
 </div>
</template>

<style lang="scss">
	
	.search-view{
		
		background: #fff;
		
	}
	
</style>

<script>
	
	import SearchBar from '@/components/search/searchBar'
	
	import HotSearch from '@/components/search/hotSearch'
	
	import { mapActions } from 'vuex'
	
	export default {
		
		components: {

			SearchBar,

			HotSearch
			
		},

		beforeCreate () {

			document.title = '用户搜索'

		},

		methods: {
			
			...mapActions([
				
				'updateIsHeader'
				
			])
			
		}
		
	}
	
	
</script>
