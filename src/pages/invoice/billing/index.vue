<template>
	<div class="pageView">
		<AppHeader :title="title"></AppHeader>
		<div class="scroll-view-wrapper">
			<div class="billing_address_item">
				<div class="billing_address_circle">
					<div class="billing_address_checked">
						<svg aria-hidden="true" class="ico ico-gou">
							<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-gou">
							</use>
						</svg>
					</div>
				</div>
				<div class="billing_address_info">
					<div class="billing_address_txt">
						<span>个人</span>
					</div>
					<p>上海市浦东新区张江高科亮秀路112号Y1座512室</p>
				</div>
				<div class="billing_address_edit">
					<svg aria-hidden="true" class="ico icon-bianji">
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-bianji">
						</use>
					</svg>
				</div>
			</div>
			<div class="billing_address_item">
				<div class="billing_address_circle">
					<div class="billing_address_checked">
						<svg aria-hidden="true" class="ico ico-gou">
							<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-gou">
							</use>
						</svg>
					</div>
				</div>
				<div class="billing_address_info">
					<div class="billing_address_txt">
						<span>企业普票</span>
					</div>
					<p>上海牛涂科技有限公司</p>
				</div>
				<div class="billing_address_edit">
					<svg aria-hidden="true" class="ico icon-bianji">
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-bianji">
						</use>
					</svg>
				</div>
			</div>
		</div>
		<div class="billing_submit_new" @click="pageAction('/invoice/billing/add')">
			<svg aria-hidden="true" class="ico icon-add">
				<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-jia2">
				</use>
			</svg>
			<span>新建地址</span>
		</div>
		<div class="billing_address_submit">
			<span class="submit_button">确认</span>
		</div>
	
	</div>
</template>

<style lang="scss">
	
	.billing_submit_new{
		
		margin: 0 .4rem 0.3rem .4rem;
		
		display: flex;
		
		height: .82rem;
		
		border-radius: .1rem;
		
		border:.02rem solid #1ba0e5;
		
		align-items: center;
		
		justify-content: center;
		
		.icon-add{
			
			width: .35rem;
			
			height: .35rem;
			
			color: #1ba0e5;
		}
		
		span{
			
			padding-left: .15rem;
			
			color: #1ba0e5;
			
			font-size: .32rem;
			
		}
	}
	
	
	.billing_address_submit{
		
		padding: 0 .4rem .5rem;
		
		span{
			
			background: #1ba0e5;
			
		}
		
	}
	
	
	.billing_address_edit{
		
		width:.7rem;
		
		height: 1.46rem;
		
		display: flex;
		
		justify-content: flex-end;
		
		align-items: center;
		
		.icon-bianji{
			
			width: .38rem;
			height: .35rem;
			color: #9d9d9d;
			
		}
		
	}
	
	.billing_address_txt{
		
		display: flex;
		
		justify-content: space-between;
		font-size: .28rem;
		
		padding-bottom: .15rem;
		
	}
	
	.billing_address_circle{
		
		display: flex;
		
		align-items: center;
		
		width: .78rem;
		height: 1.46rem;
		
	}
	
	.billing_address_info{
		
		flex:1;
		
		p{
			
			color: #9d9d9d;
		}
	}
	
	.billing_address_checked{
		
		width: .4rem;
		
		height: .4rem;
		
		border-radius: 50%;
		
		background: #fff;
		
		display: flex;
		
		align-items: center;
		
		justify-content: center;
		
		border: .02rem solid #252525;
		
		&.active{
			
			background: #252525;
			
		}
		
		.ico-gou{
			width: .26rem;
			height: .2rem;
			color: #fff;
			
		}
		
		
	}
	
	.billing_address_item{
		
		height: 1.46rem;
		
		padding: 0 .22rem;
		
		display: flex;
		
		align-items: center;
		
		background: #fff;
		
		margin-bottom:.24rem;
		
		border-bottom: .01rem solid #f1f1f1;
		
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
				title: '我要开票'

			}

		},

		beforeCreate () {

			document.title = '我要开票'

		},

		methods: {

			pageAction (url) {
				
				this.$router.push(url)
				
			}

		}

	}

</script>