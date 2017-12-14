<template>
	<div class="shop clearfix">
		<LazyLoad :options="{ele:'lazyLoad_img',scrollEle: 'appView',errorImg:'./images/default.png'}">
			<ul class="shop_list clearfix" id="lazyLoad">
				<li v-for="item in list" @click="pageAction('/detail/'+item.id)">
					<img class="lazyLoad_img" data-src="http://files.niuhuagong.com/img/item/big_60f04603d7f57a5ca877a29f752b7716.jpg" :src="defaultImg"/>
					<div class="shop_list_info">
						<p class="ellipsis">雷帝彩色抗污防霉填缝剂雷帝彩色抗污防霉填缝剂</p>
						<strong>￥<b class="shop_money">256</b></strong>
					</div>
				</li>
			</ul>
		</LazyLoad>
	</div>
</template>
<script>
	
	import LazyLoad from '@/components/widget/lazyLoad'

	import defaultImg from '@/images/default.png'
	
	export default {
		
		components: {

			LazyLoad
			
		},
		
		data () {
			
			return {

				defaultImg,
				
				list: [
					{
						"id": 1
					},
					{
						"id": 2
					},
					{
						"id": 3
					},
					{
						"id": 4
					},
					{
						"id": 5
					},
					{
						"id": 6
					},
					{
						"id": 7
					},
					{
						"id": 8
					},
					{
						"id": 9
					},
					{
						"id": 10
					}
				]
				
			}
			
		},
		
		methods: {

			pageAction (url) {
				
				this.$router.push(url)
				
			}
			
		}
		
	}
	
</script>

<style lang="scss">
	
	.shop{
		
		margin-top: .23rem;
		
		background: #fff;
		
	}
	
	.shop_list_info{
		
		padding:0 .25rem .25rem;
		
		
		p{
			
			padding-bottom: .12rem;
			
		}
		
		
		strong{
			
			color: #f65253;
			
			font-weight: bold;
			
		}
		
		.shop_money{
			
			font-size: .3rem;
			
		}
		
		
	}
	
	.shop_list{
		
		padding-top: .25rem;
		
		li{
			
			float: left;
			
			width:50%;
			
			border-bottom: 1px solid #e6e6e6;
			
			&:nth-child(2n) {
				
				border-left: 1px solid #e6e6e6;
				
			}
			
			img{
				
				margin: 0.3rem auto;
				
				display:block;
				
				width: 3rem;
				
				height: 3rem;
				
			}
			
		}
		
	}
	
</style>