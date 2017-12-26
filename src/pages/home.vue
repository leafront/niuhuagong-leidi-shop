<template>
	<div class="pageView">
	  <div class="scroll-view-wrapper" id="appView" :class="{'visibility':!pageView}">
		  <div class="overlay_mask" @click="updateSliderMenu(false)" :class="{'active':sliderMenu}"></div>
		  <Banner/>
		  <Service/>
		  <List :list="list"/>
	  </div>
		<AppFooter/>
  </div>
</template>

<script>
	
	import SliderMenu from '@/components/home/sliderMenu'
	
	import Banner from '@/components/home/banner'

  import AppFooter from '@/components/common/footer'
	
	import Service from '@/components/home/service'

	import List from '@/components/home/list'
	
	import Search from '@/components/home/search'
	
	import * as API from '@/api/home'

	import { mapActions, mapGetters } from 'vuex'
	
	export default {
		
		components: {
			SliderMenu,
			Search,
			Banner,
			List,
			Service,
			AppFooter
		},
		
		data () {
			
			return {
				
				list: []
			
			}
			
		},
		computed: {
			...mapGetters({
				'pageView':'getPageView',
				'sliderMenu': 'getSliderMenu'
			})
		},
		methods: {
			...mapActions([
				'updatePageView',
				'updateSliderMenu'
			]),
			getProductList () {

				API.getProductList({
					type: 'GET',
					data:{
						cate_id: 1
					},
					cache: true,
				}).then((res) => {

					const data = res.data

					if (data && res.status >= 1) {

						this.list = data

					} else {

						this.$toast(res.msg)

					}

					this.updatePageView(true)

					this.$hideLoading()

				})
				
			}

		},
		
		beforeCreate () {
			
			document.title = '雷帝商城'
			
		},
		
		
		mounted (){
			
			document.querySelector('.overlay_mask').addEventListener('touchmove',(event) => {
				
				event.preventDefault()
				
			})
			
		},
		created (){
			
			this.updatePageView(false)
			
			this.$showLoading()
			
			this.getProductList()
			
		}
	}
	
</script>