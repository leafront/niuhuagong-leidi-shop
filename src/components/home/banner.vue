<template>
	<swiper :list="bannerList">
		<ul class="slideshow-item">
			<li v-for="item in bannerList" :style="{'width':itemWidth}">
				<img :src="item.imgUrl" :style="{'height':imgHeight}">
			</li>
		</ul>
	</swiper>
</template>

<script>

	import swiper from '@/components/widget/swiper.vue'

	import banner1 from './images/banner_01.png'
	
	import banner2 from './images/banner_01.png'
	
	import banner3 from './images/banner_01.png'

	export default {
		components:{
			swiper
		},
		data: function () {
			return {
				
				itemWidth: document.documentElement.clientWidth + 'px',
				
				imgHeight: document.documentElement.clientWidth * 0.49 + 'px',
				
				bannerList:[
					{
						imgUrl:'https://m.360buyimg.com/mobilecms/s1125x549_jfs/t13528/81/2016468856/184778/fb7cb1fa/5a30ccdfN9a1fa29c.jpg!q70.jpg'
					},{
						imgUrl:'https://m.360buyimg.com/mobilecms/s1125x549_jfs/t16288/153/617406512/148842/5ab32014/5a38d990Nac5aba4b.jpg!q70.jpg'
					},{
						imgUrl:'https://img1.360buyimg.com/da/jfs/t15847/334/613979012/180567/6cd6603d/5a37317dNafea8b1f.jpg'
					}
				]
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



