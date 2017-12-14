<template>
	<div class="pageView">
		<AppHeader :title="title"></AppHeader>
		<div class="scroll-view-wrapper white-view">
			<div class="user_service">
				<div class="user_service_info">
					<h5>如有以下情况</h5>
					<div class="service_menu">
						<div class="service_menu_wrapper">
							<div class="service_menu_item">
								<svg class="ico zhiliangfen_icon" aria-hidden="true">
									<use xlink:href="#icon-zhiliangfen"></use>
								</svg>
							</div>
							<span>质量问题</span>
						</div>
						<div class="service_menu_wrapper">
							<div class="service_menu_item">
								<svg class="ico service_icon" aria-hidden="true">
									<use xlink:href="#icon-jishuzhichi"></use>
								</svg>
							</div>
							<span>技术咨询</span>
						</div>
						<div class="service_menu_wrapper">
							<div class="service_menu_item">
								<svg class="ico service_icon" aria-hidden="true">
									<use xlink:href="#icon-tuihuo"></use>
								</svg>
							</div>
							<span>技术咨询</span>
						</div>
					</div>
					<div class="service_phone">
						<p>请拨打<a class="service_call_phone" href="tel:400-7188-969">400-7188-969</a>人工服务</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
	
	.service_phone{
		
		display: flex;
		
		justify-content: center;
		
		padding-top: 1.1rem;
		
		.service_call_phone{
		
			font-size: .3rem;
			
			color: #1ba0e5;
			
			padding: 0 .12rem;
			
		}
		
	}
	
	.service_menu{
		
		display: flex;
		
		overflow: hidden;
		
		.service_menu_item{
			
			width: 1.38rem;
			height: 1.38rem;
			
			border-radius: 50%;
			
			background: #1ba0e4;
			
			display: flex;
			
			align-items: center;
			
			justify-content: center;
			
			.service_icon{
				
				width: .55rem;
				height: .55rem;
				color: #fff;
			
			}
			
			.zhiliangfen_icon{
				width: .65rem;
				height: .65rem;
				color: #fff;
				
			}
		}
		
	}
	
	.service_menu_wrapper{
		
		display: flex;
		
		flex-direction: column;
		
		justify-content: center;
		
		align-items: center;
		margin-right: .68rem;
		&:last-child{
			
			margin-right: 0;
			
		}
		
		span{
			
			padding-top: .36rem;
			
		}
		
	}
	
	.user_service_info{
		
		background: #fff;
		
		padding: 0 1rem;
		
		h5{
			
			text-align: center;
			
			padding: 1rem 0;
			
			font-size: .26rem;
			
			
		}
		
		
	}
	
	.user_service{
		
		background: #f6f6f6;
		
		
	}

</style>

<script>

	import AppHeader from '@/components/common/header'

	export default {

		components: {
			AppHeader
		},
		
		data () {
			
			return {
				
				title: '申请售后'
				
			}
			
		},

		beforeCreate () {

			document.title = '申请售后'

		},

		mounted () {



		},

		methods: {

			pageAction (url) {

				this.$router.push(url)

			}

		}

	}

</script>