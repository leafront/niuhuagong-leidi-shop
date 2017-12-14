<template>
	<div class="pageView">
		<AppHeader :title="title"></AppHeader>
		<div class="scroll-view-wrapper white-view">
			<div class="income_total">
				<span>本月收入</span>
				<strong>1225691.00元</strong>
			</div>
			<div class="income_item_wrapper">
				<div class="income_item">
					<div class="income_item_info">
						<img src="http://storage.jd.com/i.imageUpload/6c656166726f6e7431343635363435373337373230_mid.jpg"/>
						<div class="income_item_txt">
							<strong>典雅黑</strong>
							<span>09-02 18:21</span>
						</div>
					</div>
					<div class="income_item_money">
						<span>+5.00</span>
					</div>
				</div>
				<div class="income_item">
					<div class="income_item_info">
						<img src="http://storage.jd.com/i.imageUpload/6c656166726f6e7431343635363435373337373230_mid.jpg"/>
						<div class="income_item_txt">
							<strong>典雅黑</strong>
							<span>09-02 18:21</span>
						</div>
					</div>
					<div class="income_item_money">
						<span>+5.00</span>
					</div>
				</div>
				<div class="income_item">
					<div class="income_item_info">
						<img src="http://storage.jd.com/i.imageUpload/6c656166726f6e7431343635363435373337373230_mid.jpg"/>
						<div class="income_item_txt">
							<strong>典雅黑</strong>
							<span>09-02 18:21</span>
						</div>
					</div>
					<div class="income_item_money">
						<span>+5.00</span>
					</div>
				</div>
			</div>
			<div class="income_total">
				<span>8月收入</span>
				<strong>1225691.00元</strong>
			</div>
			<div class="income_item_wrapper">
				<div class="income_item">
					<div class="income_item_info">
						<img src="http://storage.jd.com/i.imageUpload/6c656166726f6e7431343635363435373337373230_mid.jpg"/>
						<div class="income_item_txt">
							<strong>典雅黑</strong>
							<span>09-02 18:21</span>
						</div>
					</div>
					<div class="income_item_money">
						<span>+5.00</span>
					</div>
				</div>
				<div class="income_item">
					<div class="income_item_info">
						<img src="http://storage.jd.com/i.imageUpload/6c656166726f6e7431343635363435373337373230_mid.jpg"/>
						<div class="income_item_txt">
							<strong>典雅黑</strong>
							<span>09-02 18:21</span>
						</div>
					</div>
					<div class="income_item_money">
						<span>+5.00</span>
					</div>
				</div>
				<div class="income_item">
					<div class="income_item_info">
						<img src="http://storage.jd.com/i.imageUpload/6c656166726f6e7431343635363435373337373230_mid.jpg"/>
						<div class="income_item_txt">
							<strong>典雅黑</strong>
							<span>09-02 18:21</span>
						</div>
					</div>
					<div class="income_item_money">
						<span>+5.00</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
	
	.income_item_wrapper{
		
		padding-left: .4rem;
		
	}
	
	.income_item{
		
		padding: .28rem 0;
		
		display: flex;
		
		justify-content: space-between;
		
		border-bottom: .01rem solid #ddd;
		
	}
	
	.income_item_money{
		
		padding-top: .12rem;
		
		padding-right: .2rem;
		
		span{
		
			color: #2d2d2d;
			
			font-size: .3rem;
		
		}
		
	}
	
	.income_item_txt{
	
		padding-left: .35rem;
		
		strong{
			color: #2d2d2d;
			font-size: .3rem;
			display: block;
			padding-bottom: .12rem;
			
		}
		span{
			color: #787878;
		}
		
	}
	
	.income_item_info{
		
		display: flex;
		
		align-items: center;
		
		img{
			width: .9rem;
			height: .9rem;
			border-radius: 50%;
		}
	}
	
	.income_total{
		
		padding: 0 .4rem;
		
		display: flex;
		
		height: .7rem;
		
		justify-content: space-between;
		
		align-items: center;
		
		background: #f6f6f6;
		
		font-size: .26rem;
		
		span{
			
			color: #2d2d2d;
			
		}
		strong{
			
			color: #787878;
			
		}
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

				title: '收支明细'

			}

		},

		beforeCreate () {

			document.title = '收支明细'

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