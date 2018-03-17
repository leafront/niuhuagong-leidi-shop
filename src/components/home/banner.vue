<template>
	<swiper :list="bannerList">
		<ul class="slideshow-item">
			<li v-for="item in bannerList" :style="{'width':itemWidth}" @click="pageAction(item.link)">
				<img :src="item.img" :style="{'height':imgHeight}">
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

				imgHeight: document.documentElement.clientWidth * 0.5 + 'px'
			}
		},
		methods: {

			pageAction (url) {

				if (url) {
					location.href = url
				}
			}
		}
	}
</script>
