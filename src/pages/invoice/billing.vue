<template>
	<div class="pageView">
		<AppHeader :title="title"></AppHeader>
		<div class="scroll-view-wrapper">
		
		</div>
	</div>
</template>

<style lang="scss">


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

		methods: {



		}

	}

</script>