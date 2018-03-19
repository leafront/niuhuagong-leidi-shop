<template>
	<swiper :list="bannerList">
		<ul class="slideshow-item">
			<li v-for="item in bannerList" :style="{'width':itemWidth,'height':imgHeight}">
				<img :src="item" :style="{'width':itemWidth,'height':imgHeight}">
			</li>
		</ul>
	</swiper>
</template>

<script>

	import swiper from '@/components/widget/swiper.vue'

	export default {
		props: {
			bannerList: {
				type: Array,
				default () {
					return []
				}
			}
		},
		components:{
			swiper
		},
		data () {
			return {

				itemWidth: document.documentElement.clientWidth + 'px',

				imgHeight: document.documentElement.clientWidth + 'px'
			}
		}
	}
</script>
