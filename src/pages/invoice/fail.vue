<template>
	<div class="pageView">
		<AppHeader :title="title"></AppHeader>
		<div class="scroll-view-wrapper white-view">
			<div class="invoice_status">
				<svg aria-hidden="true" class="ico icon_invoice_status">
					<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-kaixin">
					</use>
				</svg>
				<strong>您的审核未通过</strong>
				<p>原因：纳税人号码不存在</p>
			</div>
		</div>
		<div class="invoice_status_submit" @click="pageAction('/invoice/info/add')">
			<span class="submit_button">重新申请</span>
		</div>
	</div>
</template>

<style lang="scss">
	
	@import './status.scss';
	
	.invoice_status_submit{
		
		padding-bottom: .4rem;
		
		span{
			
			background: #1ba0e5;
			
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
				title: '申请增票资质'

			}

		},

		beforeCreate () {

			document.title = '申请增票资质'

		},

		methods: {

			pageAction (url) {

				this.$router.push(url)

			}

		}

	}

</script>