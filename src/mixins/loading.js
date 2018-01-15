
import { mapGetters } from 'vuex'

export const loading =  {
	computed: {
		...mapGetters({
			'pageView':'getPageView',
		})
	},
	methods: {
		showLoading () {

			setTimeout(() => {

				if (!this.pageView) {

					this.$showLoading()
				}
			},500)

		}
	}

}