<template>
	<div class="pageView">
	  <div class="scroll-view-wrapper" id="appView" :class="{'visibility':!pageView}">
		  <Banner/>
		  <Service/>
		  <List/>
	  </div>
		<AppFooter/>
  </div>
</template>

<script>
	
	import Banner from '@/components/home/banner'

  import AppFooter from '@/components/common/footer'
	
	import Service from '@/components/home/service'

	import List from '@/components/home/list'

	import { mapActions, mapGetters } from 'vuex'
	
	export default {
		
		components: {

			Banner,
			List,
			Service,
			AppFooter
			
		},
		
		data () {
			
			return {
			
			}
			
		},
		
		computed: {
			...mapGetters({
				'pageView':'getPageView'
			})
		},

		methods: {

			...mapActions([
				'updatePageView',
			])

		},
		
		beforeCreate () {
			
			document.title = '雷帝微商城'
			
		},
		
		created (){
			
			this.updatePageView(false)
			
			this.$showLoading()
		
			setTimeout(() => {

				this.updatePageView(true)

				this.$hideLoading()
				
			},300)
			
		}
	}
	
</script>

<style lang="scss">

	
</style>