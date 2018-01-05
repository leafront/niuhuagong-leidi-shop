<template>
	<div class="shop clearfix">
		<LazyLoad :list="list" :options="{ele:'lazyLoad_img',scrollEle: 'appView'}">
			<ul class="shop_list clearfix" id="lazyLoad">
				<li v-for="item in list" @click="pageAction('/detail/'+item.id)">
					<img class="lazyLoad_img" :data-src="item.product_img" :src="defaultImg"/>
					<div class="shop_list_info">
						<p class="ellipsis">{{item.product_name}}</p>
						<strike>{{item.original_price | price}}</strike><strong>￥<b class="shop_money">{{item.price | price}}</b></strong>
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
		
		props:{
			list:{
				type: Array,
				default: function () {
					return []
				}
			}
			
		},
		
		components: {

			LazyLoad
			
		},
		
		data () {
			
			return {

				defaultImg,
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
		
		strike {
			
			padding-right: .2rem;
		}
		
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