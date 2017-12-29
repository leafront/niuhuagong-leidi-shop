import * as types from './mutation-types'

import * as API from '@/api/detail'

const state = {

	footMenu: false,
	cartNum: 0

}

const getters = {

	getFootMenu: state => state.footMenu,

	getCartNum: state => state.cartNum


}

const actions = {

	updateFootMenu ( {commit}, info ){

		commit(types.UPDATE_FOOT_MENU, info)

	},

	updateCartNum ({ commit}, info ) {

		API.getCartCount({
			type: 'GET',
		}).then(res=>{

			const data = res.data

			let count = 0

			if (data && res.status >= 1) {

				count = data.prod_cnt

			}

			commit(types.UPDATE_CART_NUM, count )

		})

	}
}

const mutations = {

	[types.UPDATE_FOOT_MENU] ( state, info ) {

		state.footMenu = info
	},
	[types.UPDATE_CART_NUM] (state,info) {

		state.cartNum = info

	}

}

export default {
	state,
	getters,
	actions,
	mutations
}