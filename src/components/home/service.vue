<template>
	<div class="home_service">
		<ul class="service_menu">
			<li @click="pageAction('/cate?id=1')">
				<svg class="ico server_icon1" aria-hidden="true">
					<use xlink:href="#icon-bid-online"></use>
				</svg>
				<span>填缝剂</span>
			</li>
			<li @click="pageAction('/cate?id=2')">
				<svg class="ico server_icon2" aria-hidden="true">
					<use xlink:href="#icon-shigongdanwei"></use>
				</svg>
				<span>防水材料</span>
			</li>
			<li @click="pageAction('/cate?id=3')">
				<svg class="ico server_icon3" aria-hidden="true">
					<use xlink:href="#icon-shigongzhong1"></use>
				</svg>
				<span>胶粘剂</span>
			</li>
		</ul>
	</div>
</template>

<script>
	
	export default {
		
		data () {
			
			return {
			
			
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
	.home_service{
		
		padding: .3rem 0;
		
		background: #fff;
		
	}
	.server_icon{
		
		width: .55rem;
		height: .55rem;
	}
	
	.server_icon1{
		
		@extend .server_icon;
		
		color: #51b6eb;
	}
	
	.server_icon2{
		
		@extend .server_icon;
		
		color: #fca238;
	}
	
	
	.server_icon3{
		
		@extend .server_icon;
		
		color: #f65253;
	}
	
	.service_menu{
		
		display:flex;
		
		align-items: center;
		
		li{
			
			height: .72rem;
			
			display:flex;
			
			align-items: center;
			
			flex:1;
			
			justify-content: center;
			
			position:relative;
			
			&:after{
				
				width:.01rem;
				height: .72rem;
				content:'';
				
				background:#e6e6e6;
				
				position:absolute;
				
				right:0;
				
				top: 0;
				
				
			}
			
			&:last-child{
				
				&:after {
					
					display: none;
				}
				
			}
			span{
				
				font-size: .28rem;
				
				padding-left: .3rem;
				
			}
		}
	}
</style>