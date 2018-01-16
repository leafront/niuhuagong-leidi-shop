<template>
	<div class="pageView">
	  <div class="scroll-view-wrapper" id="appView" :class="{'visibility':!pageView}">
		  <Banner :bannerList="bannerList"/>
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
	
	import * as Model from '@/model/home'
	
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
				list: [],
				bannerList: []
			}
			
		},
		mixin: ['loading'],
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
			
			/**
			 * 获取首页banner列表
			 *
			 */
			
			getBannerList () {
					
				return Model.getBannerList({
					type: 'GET',
					cache: true,
				}).then((res) => {
					const data = res.data
					
					if (data && res.status >= 1) {
						this.bannerList = data
					} else {
						this.$toast(res.msg)
					}
					return res

				})
			},

			/**
			 * 获取商品列表
			 */
			getProductList () {
				
				return Model.getProductList({
					type: 'GET',
					data:{
						cate_id: 1
					},
					cache: false,
				}).then((res) => {
					const data = res.data
					
					if (data && res.status >= 1) {
						this.list = data
					} else {
						this.$toast(res.msg)
					}
					return res

				})
				
			}
		},
		
		beforeCreate () {
			
			document.title = '雷帝商城'
		},
		
		created (){
			
			this.updatePageView(false)
			
			Promise.all([
				this.getBannerList(),
				this.getProductList()
			]).then((res) => {
				if (res) {
					let isSendSuccess = res.every((item) => {
						return item.status >= 1
					})
					if (isSendSuccess) {
						this.updatePageView(true)
						this.$hideLoading()
					}
				}
			})

			this.showLoading()
			
		}
	}
	
</script>