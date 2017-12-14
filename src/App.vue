<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
	
	import { mapGetters, mapActions } from 'vuex'
	
	import utils from '@/widget/utils'
	
	export default {
		
		methods: {

			pageAction (url) {

				this.$router.push(url);

			}

		},
		watch: {
			'$route'() {
				
				this.$nextTick(() => {
					
					utils.fixedBottom()
					
				})
				
			}
			
		}
	}
	
</script>

<style lang="scss">
	
	@import './styles/loading.scss';
	@import './styles/toast.scss';
	@import './styles/dialog.scss';
	@import './styles/footer.scss';
	@import './styles/main.scss';
	@import './styles/selectMenu.scss';
	
</style>
