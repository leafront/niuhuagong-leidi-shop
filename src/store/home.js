import * as types from './mutation-types'

const state = {
	sliderMenu: false
}

const getters = {
	getSliderMenu: state=>state.sliderMenu
}

const actions = {
	updateSliderMenu ( {commit}, info ){
		commit(types.UPDATE_SLIDER_MENU, info)
	}
}

const mutations = {
	[types.UPDATE_SLIDER_MENU] ( state, info ) {
		state.sliderMenu = info
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}