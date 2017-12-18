import * as types from './mutation-types'

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

		commit(types.UPDATE_CART_NUM, info )

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