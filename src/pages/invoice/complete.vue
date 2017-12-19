<template>
	<div class="pageView">
		<AppHeader :title="title"></AppHeader>
		<div class="scroll-view-wrapper white-view">
			<div class="invoice_status">
				<svg aria-hidden="true" class="ico icon_invoice_status">
					<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-tijiaoziliao">
					</use>
				</svg>
				<strong>申请成功</strong>
				<p>工作人员会在2个工作日内完成审核</p>
				<p>请耐心等待！</p>
			</div>
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