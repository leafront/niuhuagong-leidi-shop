<template>
	<div class="pageView">
		<AppHeader :title="title"></AppHeader>
		<div class="scroll-view-wrapper white-view">
			<div class="invoice_status">
				<svg aria-hidden="true" class="ico icon_invoice_status">
					<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-kaixin">
					</use>
				</svg>
				<strong>您的审核已通过</strong>
				<p>已保存至"开票资料"</p>
			</div>
		</div>
		<div class="ui-submit-button white-view" @click="pageAction('/invoice/increment')">
			<span class="submit_button">申请新的增票资质</span>
		</div>
	</div>
</template>

<style lang="scss">
	
	@import './status.scss';
	
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