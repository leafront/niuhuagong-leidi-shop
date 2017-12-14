<template>
	<div class="pageView">
		<AppHeader :title="title"></AppHeader>
		<div class="scroll-view-wrapper logistics-view" id="appView" :class="{'visibility':!pageView}">
			<div class="logistics">
				<div class="logistics_info">
					<div class="logistics_info_icon">
						<svg class="ico icon_wuliu" aria-hidden="true">
							<use xlink:href="#icon-wuliu"></use>
						</svg>
					</div>
					<div class="logistics_info_txt">
						<p>物流公司：中通快递</p>
						<p>运单编号：810558890388829</p>
					</div>
				</div>
				<div class="logistics_list">
					<div class="logistics_list_item active">
						<i class="logistics_circle"></i>
						<div class="logistics_list_time">
							<p>已发往上海中转站</p>
							<p class="logistics_timer">2017-12-05  08:12:35</p>
						</div>
					</div>
					<div class="logistics_list_item">
						<i class="logistics_circle"></i>
						<div class="logistics_list_time">
							<p>已离开江苏苏州</p>
							<p class="logistics_timer">2017-12-05  08:12:35</p>
						</div>
					</div>
					<div class="logistics_list_item">
						<i class="logistics_circle"></i>
						<div class="logistics_list_time">
							<p>已揽件</p>
							<p class="logistics_timer">2017-12-03  12:12:35</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
	
	.logistics-view{
		
		background: #fff;
		
	}
	
	.logistics_list_item{
		
		padding: .45rem .65rem .55rem;
		
		background: #fff;
		
		display: flex;
		
		.logistics_circle{
			
			margin-top: .1rem;
			
			width: .15rem;
			height: .15rem;
			background: #cecece;
			border-radius: 50%;
			
			&:after{
				content:'';
				display: block;
				width: .01rem;
				height: 1rem;
				background: #cecece;
				
				position: relative;
				
				top: .36rem;
				
				left: .06rem;
				
			}
			
		}
		
		&:last-child{
			
			.logistics_circle{
				&:after{
					
					display:none;
					
				}
				
			}
			
		}
		
		&.active{
			.logistics_circle{
				
				background: #1ba0e5;
			
			}
			
			.logistics_list_time{
				color: #1ba0e5;
				
			}
			
		}
		
	}
	
	.logistics_list_time{
		
		padding-left: .72rem;
		
		color: #9d9d9d;
		.logistics_timer{
			
			padding-top: .12rem;
			
		}
		
	}
	
	.logistics_list{
		
		padding-top: .24rem;
		
		
		background: #f6f6f6;
	
	}
	
	.logistics_info{
	
		padding: .32rem .2rem;
		
		background: #fff;
		
		display: flex;
		
		align-items: center;
	
	}
	
	.logistics_info_txt{
	
		padding-left: .32rem;
		
		p{
			
			line-height: .44rem;
			
			font-size: .28rem;
			
		}
	
	}
	
	.logistics_info_icon{
		
		width: 1.04rem;
		
		height: 1.04rem;
		
		background: #cecece;
		
		border-radius: 50%;
		
		display: flex;
		
		align-items: center;
		
		justify-content: center;
		
		.icon_wuliu{
		
			width: .65rem;
			
			height: .55rem;
			
			color: #fff;
			
		}
		
	}
	
</style>

<script>

	import AppHeader from '@/components/common/header'

	import { mapActions, mapGetters } from 'vuex'
	
	export default {
		
		components: {
			AppHeader
			
		},
		
		data () {
		
			return {
				
				title: '物流详情'
				
			}
		
			
		},

		computed: {
			...mapGetters({
				'pageView':'getPageView'
			})
		},
		
		methods: {

			...mapActions([
				'updatePageView',
			])
		},
		
		created (){

			this.updatePageView(false)

			this.$showLoading()

			setTimeout(() => {

				this.updatePageView(true)

				this.$hideLoading()

			},300)

		}
		
	}
	
</script>