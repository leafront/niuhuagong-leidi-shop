import * as types from './mutation-types'

const state = {

	footMenu: false

}

const getters = {

	getFootMenu: state => state.footMenu


}

const actions = {

	updateFootMenu ( {commit}, info ){

		commit(types.UPDATE_FOOT_MENU, info)

	}
}

const mutations = {

	[types.UPDATE_FOOT_MENU] ( state, info ) {

		state.footMenu = info
	}

}

export default {
	state,
	getters,
	actions,
	mutations
}