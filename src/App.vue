<template>
  <div id="app">
	  <router-view></router-view>
  </div>
</template>

<script>

	import { mapGetters, mapActions } from 'vuex'

	import * as Model from '@/model/common'

	import utils from '@/widget/utils'

	import store from '@/widget/store'

	export default {

		created () {

			function bodyScroll (evt) {

				//In this case, the default behavior is scrolling the body, which
				//would result in an overflow.  Since we don't want that, we preventDefault.
				if(!evt._isScroller) {
					evt.preventDefault();

				}
			}

			document.body.addEventListener('touchmove',bodyScroll,false);

		},
		beforeCreate () {

			/**
			 * 城市地区数据缓存
			 */

			Model.areaCity({
				type: 'GET',
				cache: true
			}).then((res) => {

				const expires = 24 * 60 * 60 * 1000

				let result = {
					times: new Date().getTime() + expires,
					results: res
				}

				if (!store.get('/static/data/areaCity.js')) {
					store.set('/static/data/areaCity.js', result)
				}
			})
			
			/**
			 * 获取iconfont 字体文件缓存
			 */

			Model.getIconFont({
				type: 'GET',
				dataType: 'text',
				cache: true
			}).then((res) => {

				utils.appendScript(res)

				const expires = 30 * 60 * 1000

				let result = {
					times: new Date().getTime() + expires,
					results: res
				}

				if (!store.get('/static/fonts/iconfont.js')) {

					store.set('/static/fonts/iconfont.js', result)

				}
			})

			/**
			 * 获取 fastclick 文件缓存
			 */

			Model.getFastClick({
				type: 'GET',
				dataType: 'text',
				cache: true
			}).then((res) => {

				if (!store.get('/static/fastclick/index.js')) {

					const expires = 30 * 60 * 60 * 1000

					let result = {
						times: new Date().getTime() + expires,
						results: res
					}

					utils.appendScript(res)

					store.set('/static/fastclick/index.js', result)

					if ('addEventListener' in document) {
						document.addEventListener('DOMContentLoaded', function() {
							FastClick.attach(document.body);
						}, false);
					}

				}
			})
		},
		watch: {
			'$route'(to,from) {

				this.$nextTick(() => {
					utils.fixedBottom()
				})
			}
		}
	}

</script>

<style lang="scss">
	@import './styles/reset.scss';
	@import './styles/loading.scss';
	@import './styles/toast.scss';
	@import './styles/footer.scss';
	@import './styles/main.scss';
	@import './styles/slider.scss';
	@import './styles/selectMenu.scss';

</style>
