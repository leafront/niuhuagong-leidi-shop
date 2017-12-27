<template>
	<div class="pageView">
		<AppHeader :title="title"></AppHeader>
		<div class="scroll-view-wrapper" id="appView">
			<div class="invoice">
				<div class="invoice_item" @click="pageAction('/invoice/billing')">
				  <div class="invoice_item_info">
					  <svg class="ico invoice_icon" aria-hidden="true">
						  <use xlink:href="#icon-fapiao1"></use>
					  </svg>
					  <span>我要开票</span>
				  </div>
					<svg class="ico arrow_right_ico" aria-hidden="true">
						<use xlink:href="#icon-jiantou-right"></use>
					</svg>
				</div>
				<div class="invoice_item" @click="pageAction('/invoice/history')">
					<div class="invoice_item_info">
						<svg class="ico invoice_icon" aria-hidden="true">
							<use xlink:href="#icon-lishi"></use>
						</svg>
						<span>历史开票记录</span>
					</div>
					<svg class="ico arrow_right_ico" aria-hidden="true">
						<use xlink:href="#icon-jiantou-right"></use>
					</svg>
				</div>
				<div class="invoice_item" @click="pageAction('/invoice/info')">
					<div class="invoice_item_info">
						<svg class="ico invoice_icon" aria-hidden="true">
							<use xlink:href="#icon-ziliao"></use>
						</svg>
						<span>开票资料</span>
					</div>
					<svg class="ico arrow_right_ico" aria-hidden="true">
						<use xlink:href="#icon-jiantou-right"></use>
					</svg>
				</div>
				<div class="invoice_item" @click="pageAction('/invoice/increment')">
					<div class="invoice_item_info">
						<svg class="ico invoice_icon" aria-hidden="true">
							<use xlink:href="#icon-dizhi"></use>
						</svg>
						<span>增票资质</span>
					</div>
					<div class="invoice_item_txt">
						<span>去申请</span>
						<svg class="ico arrow_right_ico" aria-hidden="true">
							<use xlink:href="#icon-jiantou-right"></use>
						</svg>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>


<script>

	import AppHeader from '@/components/common/header'

	export default {

		components: {
			AppHeader

		},

		data () {

			return {
				title: '发票管理'

			}

		},

		beforeCreate () {

			document.title = '发票管理'

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
	
	.invoice_item_txt{
		
		display: flex;
		
		align-items: center;
		
		span{
			
			font-size: .26rem;
			
			color: #9d9d9d;
			
			padding-right: .15rem;
			
		}
		
	}
	
	.invoice_item_info{
		
		display: flex;
		
		height: .76rem;
		
		align-items: center;
		.invoice_icon{
			
			width: .32rem;
			height: .32rem;
			color: #9d9d9d;
			
			
		}
		span{
			
			padding-left: .26rem;
		
			font-size: .26rem;
		
		}
	}
	
	.invoice{
		
		padding-left: .4rem;
		
		background: #fff;
	
	}
	.invoice_item{
		
		height: 1.02rem;
		
		border-bottom: .01rem solid #ededed;
		
		display: flex;
		
		justify-content: space-between;
		
		align-items: center;
		
		.arrow_right_ico{
			margin-right: .25rem;
			width: .3rem;
			height: .6rem;
			color: #c1c1c1;
		}
	}
	
</style>