<template>
	<swiper :list="bannerList">
		<ul class="slideshow-item">
			<li v-for="item in bannerList" :style="{'width':itemWidth}" >
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

<style lang="scss">

	.slideshow-wrap {
		overflow: hidden;
		position: relative;
		width: 100%;
		background:#f4f4f8;
	}

	.slideshow-item {
		width: 20000px;
	}

	.slideshow-item li {
		width: 7.5rem;

		float: left;
	}

	.slideshow-item img {
		width: 100%;
	}

	.slideshow-dots {
		position: absolute;
		bottom: .2rem;
		left: .58rem;
		color: #fff;
	}

	.slideshow-dots li {
		width: .18rem;
		height: .18rem;
		border-radius: 50%;
		background-color: #eff0f1;
		float: left;
		margin-right:.2rem;
	}

	.slideshow-dots li.active {
		background-color: #1ba0e5;
	}

</style>



