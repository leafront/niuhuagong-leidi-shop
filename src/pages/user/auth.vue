<template>
	<div class="pageView">
		<AppHeader :title="title" :backFn="backFn"/>
		<div class="scroll-view-wrapper">
			<div class="user_auth_item" @click="pageAction('/auth/factory')">
				<div class="user_auth_icon">
					<svg class="ico auth_icon" aria-hidden="true">
						<use xlink:href="#icon-woshou"></use>
					</svg>
				</div>
				<div class="user_auth_info">
					<div class="user_auth_txt">
						<h5>合作伙伴认证</h5>
						<strong>立即认证</strong>
					</div>
					<p>雷帝官方授权施工店，瓷砖店专属标识；可以
						添加导购员，通过接单获取销售收入分成</p>
				</div>
			</div>
			<div class="user_auth_item" @click="pageAction('/auth/artisan')">
				<div class="user_auth_icon">
					<svg class="ico auth_icon" aria-hidden="true">
						<use xlink:href="#icon-gongren"></use>
					</svg>
				</div>
				<div class="user_auth_info">
					<div class="user_auth_txt">
						<h5>施工工匠认证</h5>
						<strong>立即认证</strong>
					</div>
					<p>雷帝官方认证专属标识，提升信任度；可通过
						接单获取施工收入分成；还有机会参与雷帝官
						方培训与评选</p>
				</div>
			</div>
			<div class="user_auth_item" @click="pageAction('/auth/guide')">
				<div class="user_auth_icon">
					<svg class="ico auth_icon" aria-hidden="true">
						<use xlink:href="#icon-wujiaoxing"></use>
					</svg>
				</div>
				<div class="user_auth_info">
					<div class="user_auth_txt">
						<h5>达人导购认证</h5>
						<strong>立即认证</strong>
					</div>
					<p>雷帝官方授权导购员专属标识，通过通过兼职
						导购的形式，获取销售收入分成</p>
				</div>
			</div>
		</div>
  </div>
</template>
<script>
	
	import AppHeader from '@/components/common/header'

	export default {

		data () {

			return {
				title: '会员认证'

			}

		},

		components: {
			AppHeader
		},

		beforeCreate () {

			document.title = '会员认证'

		},

		methods: {

			backFn () {

				this.pageAction('/user/center')

			},

			pageAction (url) {

				this.$router.push(url)

			}

		}

	}

</script>

<style lang="scss">
	
	.user_auth_info{
		
		flex:1;
		
		padding-left: .44rem;
		
		p{
			
			padding-top: .2rem;
			
			padding-right: .4rem;
			
			line-height: .34rem;
			
			color: #9d9c9c;
			
		}
		
	}
	
	.user_auth_txt{
	
		display: flex;
		
		justify-content: space-between;
		
		h5{
			
			color: #4a4a4b;
			
			font-size: .32rem;
			
			font-weight: bold;
			
		}
		
		strong{
			
			height: .46rem;
			
			line-height: .46rem;
			
			background: #f65253;
			
			padding: 0 .4rem;
			
			color: #fff;
			
			border-top-left-radius: .4rem;
			border-bottom-left-radius: .4rem;
			
		}
	
	}
	
	.user_auth_item{
		
		margin-top: .24rem;
		
		padding: .48rem 0 .48rem .4rem;
		
		background: #fff;
		
		display:flex;
		
		justify-content: space-between;
		
	}
	
	.user_auth_icon{
		
		width: 1.5rem;
		
		height: 1.5rem;
		
		border-radius: .2rem;
		
		background: #f6f6f6;
		
		display: flex;
		
		align-items: center;
		
		justify-content: center;
		
		.auth_icon{
		
			width: .8rem;
			
			height: .8rem;
			
			color: #1ba0e5;
		
		}
	}
	
</style>
